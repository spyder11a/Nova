// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleHotelReview {
    struct Review {
        address reviewer;     // Address of the person who left the review
        address hotel;        // Address of the hotel
        string reviewText;    // The actual review content
        string ipfsHash;      // IPFS hash for additional content (images/documents)
        uint8 rating;         // Rating (1-5 stars)
        uint256 timestamp;    // When the review was submitted
    }

    // Array to store all reviews
    Review[] public reviews;

    // Mapping to track if a user has already reviewed a hotel
    mapping(address => mapping(address => bool)) public hasReviewed;

    // Event emitted when new review is added
    event ReviewAdded(
        address indexed reviewer,
        address indexed hotel,
        string ipfsHash,
        uint8 rating,
        uint256 timestamp
    );

    // Function to submit a new review
    function submitReview(
        address _hotel,
        string memory _reviewText,
        string memory _ipfsHash,
        uint8 _rating
    ) external {
        // Input validation
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        require(bytes(_reviewText).length > 0, "Review text cannot be empty");
        require(bytes(_reviewText).length <= 1000, "Review text too long");
        require(_hotel != address(0), "Invalid hotel address");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(!hasReviewed[msg.sender][_hotel], "Already reviewed this hotel");

        // Create and store the review
        reviews.push(Review({
            reviewer: msg.sender,
            hotel: _hotel,
            reviewText: _reviewText,
            ipfsHash: _ipfsHash,
            rating: _rating,
            timestamp: block.timestamp
        }));

        // Mark that this user has reviewed this hotel
        hasReviewed[msg.sender][_hotel] = true;

        // Emit event
        emit ReviewAdded(
            msg.sender,
            _hotel,
            _ipfsHash,
            _rating,
            block.timestamp
        );
    }

    // Function to get all reviews
    function getAllReviews() external view returns (Review[] memory) {
        return reviews;
    }

    // Function to get reviews in pages
    function getReviewsByPage(uint256 page, uint256 perPage) 
        external 
        view 
        returns (
            Review[] memory pageReviews,
            uint256 totalReviews
        ) 
    {
        totalReviews = reviews.length;
        
        uint256 startIndex = page * perPage;
        uint256 endIndex = startIndex + perPage;
        
        // Adjust endIndex if it exceeds array length
        if (endIndex > totalReviews) {
            endIndex = totalReviews;
        }
        
        // Calculate actual page size
        uint256 pageSize = endIndex - startIndex;
        
        // Create array for page of reviews
        pageReviews = new Review[](pageSize);
        
        // Fill the array
        for (uint256 i = 0; i < pageSize; i++) {
            pageReviews[i] = reviews[startIndex + i];
        }
        
        return (pageReviews, totalReviews);
    }

    // Function to get reviews by hotel address
    function getHotelReviews(address hotel) external view returns (Review[] memory) {
        // First, count reviews for this hotel
        uint256 count = 0;
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].hotel == hotel) {
                count++;
            }
        }

        // Create array of appropriate size
        Review[] memory hotelReviews = new Review[](count);
        
        // Fill array with hotel's reviews
        uint256 index = 0;
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].hotel == hotel) {
                hotelReviews[index] = reviews[i];
                index++;
            }
        }

        return hotelReviews;
    }

    // Function to get reviews by reviewer address
    function getReviewsByReviewer(address reviewer) external view returns (Review[] memory) {
        // First, count reviews by this reviewer
        uint256 count = 0;
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].reviewer == reviewer) {
                count++;
            }
        }

        // Create array of appropriate size
        Review[] memory userReviews = new Review[](count);
        
        // Fill array with reviewer's reviews
        uint256 index = 0;
        for (uint256 i = 0; i < reviews.length; i++) {
            if (reviews[i].reviewer == reviewer) {
                userReviews[index] = reviews[i];
                index++;
            }
        }

        return userReviews;
    }

    // Function to check if a user has reviewed a hotel
    function hasUserReviewedHotel(address user, address hotel) external view returns (bool) {
        return hasReviewed[user][hotel];
    }
}