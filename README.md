# Igris - Decentralized Hotel Review System 🚀

## 🌟 Inspiration

Our inspiration for creating this decentralized hotel review system stemmed from the challenges in traditional review platforms, where reviews are often manipulated or biased. We wanted to create a system where feedback is tamper-proof, transparent, and incentivized for users. By utilizing blockchain technology, we aimed to build a platform that ensures authenticity, where hotel reviews are stored securely, and users are rewarded based on their contributions. Additionally, we implemented an AI-based moderation system to ensure that all video content remains safe and complies with community guidelines.

## 🔥 What It Does

Igris, built on the Electroneum Blockchain, offers the following functionalities:

1. 🏨 **Hotel Listings & Bookings**: Hotels connect their wallets via MetaMask, pay a subscription fee, and list their dinner slots for users to book.
2. 🎥 **User Reviews**: After booking, users can submit reviews, including a video (stored on IPFS), a text review, and a rating.
3. 🔗 **Immutable Reviews**: All user reviews are stored on-chain using Electroneum’s secure blockchain, ensuring they cannot be altered.
4. ⭐ **Credit Score System**: Users earn a credit score based on the likes their reviews receive. A higher score leads to more rewards and visibility on the platform.
5. 🤖 **AI-Based Content Moderation**: AI algorithms analyze video reviews for inappropriate content before storing them on IPFS, ensuring platform integrity and compliance.
6. 💰 **Decentralized and Secure Payments**: Transactions (such as bookings and payments) are handled using Electroneum’s blockchain, ensuring fast processing times and low fees.

## 🛠️ How We Built It

1. 🔗 **Electroneum Blockchain**: Chosen for its fast 5-second block finality, low transaction costs, and high throughput, making it perfect for real-time interactions.
2. 🔐 **IBFT Consensus Protocol**: Ensures all transactions are securely validated, handling financial aspects such as hotel subscriptions, booking payments, and user rewards.
3. 📜 **Smart Contracts**: Implemented to handle booking management, review submissions, and credit score tracking.
4. 🤖 **AI Content Moderation**:
   - Integrated AI-based algorithms to analyze video reviews before uploading to IPFS.
   - Used convolutional neural networks (CNNs) and machine learning models to detect inappropriate content (e.g., nudity, violence).
5. 📱 **React Native & Expo**:
   - Developed the mobile app using React Native and Expo for a cross-platform experience on iOS and Android.
   - Utilized Expo Router for seamless navigation across different screens (e.g., booking, review submission, credit score tracking).
6. 📂 **IPFS for Video Storage**: Ensured video reviews are securely stored in a decentralized manner, making them tamper-proof and accessible.
7. 🖥️ **Backend (Node.js)**:
   - Handles user authentication, API requests, and interactions with Electroneum’s smart contracts.
   - Integrates with IPFS to upload and retrieve video content associated with user reviews.

## 🚧 Challenges We Ran Into

1. ⚡ **Blockchain Integration**: Managing wallet interactions, real-time smart contract execution, and ensuring smooth user experience without blockchain delays.
2. 🔍 **Content Moderation**: Fine-tuning AI models for accurate and real-time detection of inappropriate content.
3. 💸 **Transaction Costs**: Balancing transaction fees while keeping the platform attractive for users.
4. 📈 **Scalability**: Ensuring the platform can handle increasing numbers of hotel listings, user reviews, and video submissions while maintaining high performance.

## 🏆 Accomplishments We’re Proud Of

1. 🌐 **Decentralized and Transparent System**: Successfully created a platform where all reviews are securely stored on-chain.
2. ⚡ **Seamless Integration with Electroneum**: Fully integrated Electroneum’s fast and low-cost transactions for booking payments and review submissions.
3. 🛡️ **AI-Driven Content Moderation**: Effectively filtering inappropriate content using AI-based moderation.
4. 🎖️ **Credit Score System**: Successfully implementing an incentivization system that encourages high-quality user contributions.

## 📚 What We Learned

1. 🔗 **Blockchain Development with Electroneum**: Understanding IBFT consensus protocol and leveraging high throughput and low transaction costs.
2. 🧠 **AI and Machine Learning in Content Moderation**: Implementing deep learning models for real-time video analysis.
3. 📊 **Scalable Systems**: Optimizing decentralized apps to handle blockchain transactions and large video uploads efficiently.
4. 🔧 **Integration of Multiple Technologies**: Successfully combining blockchain, AI, IPFS, and React Native for a seamless experience.

## 🚀 What's Next for Igris

1. 🤖 **Expanding AI Moderation**: Enhancing AI content moderation models for greater accuracy in detecting inappropriate content.
2. 🎮 **Rewards & Gamification**: Adding features such as badges, leaderboards, and reward tiers to further incentivize users.
3. 🔄 **Cross-Blockchain Integration**: Exploring integrations with other blockchain networks to expand platform accessibility.
4. 📱 **Mobile App Enhancements**: Introducing features like user profiles, advanced review filters, and better onboarding.
5. 📈 **Scaling for Growth**: Optimizing infrastructure to handle increasing transaction volumes as the platform grows.

## 🔗 Demo & Download

- 🌐 **Live Demo**: https://www.youtube.com/watch?v=AdK-xbJrXzI
- 📥 **Download APK**: https://expo.dev/artifacts/eas/6TX2pCJWvE3u5m6d3GZocT.apk

## 🏗️ Built With

- 🔗 **Blockchain**: Electroneum (IBFT Consensus)
- 📜 **Smart Contracts**: Solidity
- 📱 **Frontend**: React Native & Expo
- 🖥️ **Backend**: Node.js
- 📂 **Storage**: IPFS
- 🤖 **AI Content Moderation**: CNNs & Machine Learning Models

## ⚡ Quick Run

1. Clone the repository:
   ```bash
   git clone https://github.com/spyder11a/Igris
   cd igris
   ```

1. Install dependencies manually:
   ```bash
   make install
   ```
2. Start the frontend in tab1:
   ```bash
   cd frontend && npm start
   ```
3. Run the backend in tab2:
   ```bash
   cd backend && node server.js
   ```

  scan the Qr using expo go and enjoy


With these simple commands, you can quickly get Igris up and running! 🚀


