# ClassFund 🎓

**Decentralized Class Treasury Management System**

A full-stack Web3 application combining Solidity smart contract + Next.js frontend.

## 📁 Project Structure

```
class-fund/
├── contracts/          # Solidity Smart Contracts (Hardhat)
├── frontend/           # Next.js Frontend Application
├── ignition/           # Hardhat deployment scripts
├── scripts/            # Deployment & utility scripts
├── test/               # Smart contract tests
├── hardhat.config.ts
├── README.md
└── ... 
```

## 🚀 Quick Start

### Backend (Smart Contract)
```bash
npm install
npx hardhat compile
npx hardhat test
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features
- Transparent treasury management
- Role-based access (Treasurer & Members)
- Real-time blockchain events
- Built with Hardhat + Next.js + Ethers.js

See `frontend/README.md` for frontend details and `contracts/` for smart contract.