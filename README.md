# ClassFund 🎓

**Decentralized Class Treasury Management System**

A full-stack Web3 application for managing class funds transparently on blockchain.

## ✨ Features

- **Smart Contract**: Solidity + Hardhat (Treasury management with roles)
- **Frontend**: Next.js 14 + TypeScript + Ethers.js
- **Transparent**: All transactions recorded on-chain
- **Role-based**: Treasurer & Member permissions

## 📁 Project Structure

```bash
class-fund/
├── contracts/          # Solidity Smart Contracts
├── frontend/           # Next.js Frontend Application
├── ignition/           # Hardhat Ignition deployment
├── scripts/            # Utility scripts
├── test/               # Contract tests
├── hardhat.config.ts
├── package.json        # Root monorepo scripts
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/saftanasdalihin/class-fund.git
cd class-fund
npm install
```

### 2. Run Smart Contracts
```bash
# Compile
npm run contracts:compile

# Test
npm run test

# Deploy (local)
npm run contracts:deploy
```

### 3. Run Frontend
```bash
npm run dev
```

## 📋 Available Scripts (Root)

```bash
npm run dev                 # Start frontend
npm run contracts:compile   # Compile Solidity
npm run contracts:deploy    # Deploy contracts
npm run test                # Run tests
```

## 🛠 Tech Stack

**Backend**
- Solidity
- Hardhat
- Ethers.js

**Frontend**
- Next.js 14
- TypeScript
- Tailwind CSS
- Ethers.js / Web3

## 📄 Documentation

- [Smart Contracts](./contracts/)
- [Frontend](./frontend/)

---

Made with ❤️ for transparent education funding.