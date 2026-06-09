# Class Fund Frontend

The official frontend application for **Class Fund** — A transparent Web3-based platform for managing class funds using smart contracts.

## ✨ Features

- Modern and responsive UI built with Next.js 14
- Wallet connection (MetaMask, WalletConnect, etc.)
- Real-time interaction with ClassFund smart contract
- Dashboard for class fund management
- Transparent on-chain transactions
- Fully responsive design

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3 Library**: ethers.js
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React hooks + Context API

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# From project root
npm run frontend:install
```

### 2. Run Development Server

```bash
# From project root
npm run dev
```
or directly:

```bash
cd frontend
npm run dev
```
The app will be available at http://localhost:3000

## 📁 Project Structure
```bash
frontend/
├── src/
│   ├── app/              # Next.js 14 App Router
│   ├── components/       # Reusable UI components
│   ├── constants/        # ABI and contract addresses
│   ├── hooks/            # Custom React hooks (web3)
│   └── lib/              # Utilities and helpers
├── public/               # Static assets
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🔗 Smart Contract Integration

Smart contracts are located in the root folder: ../contracts
Contract ABI is available at: frontend/src/constants/abi.json

## 📝 Environment Variables

Create .env.local inside the frontend/ folder:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

## 🧪 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Run production build
```

Built with ❤️ for transparent and decentralized class fund management.
