// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HotelBooking {
    address public immutable owner;
    uint256 public totalRewardPool;
    uint256 public constant BOOKING_FEE = 5e16; // 0.05 ETN
    uint256 public constant MIN_SUBSCRIPTION_FEE = 1e17; // 0.1 ETN
    uint256 public constant MAX_CREDIT_SCORE = 100;

    struct Booking {
        address user;
        uint256 timestamp;
        bool confirmed;
        uint256 bookingId;
    }

    struct Hotel {
        bool isRegistered;
        address owner;
        uint256 subscriptionPaid;
        uint256 lastSubscriptionTimestamp;
    }

    mapping(address => Hotel) public hotels;
    mapping(address => Booking[]) public hotelBookings;
    mapping(address => uint256) public lastRewardClaim;
    uint256 public bookingIdCounter;

    event HotelSubscribed(address indexed hotel, uint256 amountPaid, uint256 timestamp);
    event BookingMade(address indexed user, address indexed hotel, uint256 bookingId);
    event InfluencerPaid(address indexed influencer, uint256 amount, uint256 creditScore);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    error InsufficientSubscriptionFee();
    error HotelAlreadySubscribed();
    error HotelNotRegistered();
    error IncorrectBookingFee();
    error InvalidCreditScore();
    error InsufficientRewardPool();
    error RewardClaimTooSoon();
    error TransferFailed();

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    bool private _locked;

    function subscribeToPlatform() external payable {
        if (msg.value < MIN_SUBSCRIPTION_FEE) revert InsufficientSubscriptionFee();
        if (hotels[msg.sender].isRegistered) revert HotelAlreadySubscribed();

        hotels[msg.sender] = Hotel({
            isRegistered: true,
            owner: msg.sender,
            subscriptionPaid: msg.value,
            lastSubscriptionTimestamp: block.timestamp
        });

        totalRewardPool += msg.value / 2;
        emit HotelSubscribed(msg.sender, msg.value, block.timestamp);
    }

    function bookHotel(address hotel) external payable nonReentrant {
        if (!hotels[hotel].isRegistered) revert HotelNotRegistered();
        if (msg.value != BOOKING_FEE) revert IncorrectBookingFee();

        uint256 newBookingId = ++bookingIdCounter;
        hotelBookings[hotel].push(Booking({
            user: msg.sender,
            timestamp: block.timestamp,
            confirmed: true,
            bookingId: newBookingId
        }));

        emit BookingMade(msg.sender, hotel, newBookingId);
    }

    function getBookingsForHotel(address hotel) external view returns (Booking[] memory) {
        return hotelBookings[hotel];
    }

    function claimInfluencerRewards(uint256 creditScore) external nonReentrant {
        if (creditScore == 0 || creditScore > MAX_CREDIT_SCORE) revert InvalidCreditScore();
        if (block.timestamp - lastRewardClaim[msg.sender] < 1 days) revert RewardClaimTooSoon();

        uint256 rewardAmount = (totalRewardPool * creditScore) / MAX_CREDIT_SCORE;
        if (rewardAmount > totalRewardPool) revert InsufficientRewardPool();

        totalRewardPool -= rewardAmount;
        lastRewardClaim[msg.sender] = block.timestamp;

        (bool success, ) = payable(msg.sender).call{value: rewardAmount}("");
        if (!success) revert TransferFailed();

        emit InfluencerPaid(msg.sender, rewardAmount, creditScore);
    }

    function withdrawFunds() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance - totalRewardPool;
        require(balance > 0, "No excess funds available");

        (bool success, ) = payable(owner).call{value: balance}("");
        if (!success) revert TransferFailed();

        emit FundsWithdrawn(owner, balance);
    }

    receive() external payable {}
}
