"use client";
import { useState } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json";

export default function Home() {
  // --- State Management ---
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState<any>(null);
  const [isTreasurer, setIsTreasurer] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("0");
  const [userContribution, setUserContribution] = useState("0");
  
  // --- Form States ---
  const [newMemberAddress, setNewMemberAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [payAmount, setPayAmount] = useState("0.01");
  const [transactions, setTransactions] = useState<any[]>([]);

  const contractAddress = "0x43c9c8ced4655a2b7ee26d680935cb0d82bdf071";

  // --- Core Functions ---
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        
        // Satpam Jaringan (Sepolia)
        if (network.chainId !== 11155111n) {
          alert("Connect to Sepolia Network!");
          return;
        }

        const signer = await signer.getSigner();
        const userAddress = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);

        // Fetch Data Global
        const [rawBalance, treasurerAddr, period, myTotal] = await Promise.all([
          contractInstance.getBalance(),
          contractInstance.treasurer(),
          contractInstance.currentPeriod(),
          contractInstance.totalContributions(userAddress)
        ]);

        setAddress(userAddress);
        setContract(contractInstance);
        await fetchHistory(contractInstance);
        setBalance(ethers.formatEther(rawBalance));
        setCurrentPeriod(period.toString());
        setUserContribution(ethers.formatEther(myTotal));
        setIsTreasurer(userAddress.toLowerCase() === treasurerAddr.toLowerCase());
      } catch (err) {
        console.error("Failed to connect wallet", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function fetchHistory(contractInstance: any) {
  try {
    // Search for "Paid" events from the last 10,000 blocks
    const filter = contractInstance.filters.Paid();
    const events = await contractInstance.queryFilter(filter, -10000); // last 10k blocks

    const history = events.map((event: any) => ({
      from: event.args[0],
      amount: ethers.formatEther(event.args[1]),
      timestamp: new Date(Number(event.args[2]) * 1000).toLocaleString("id-ID"),
    }));

    setTransactions(history.reverse()); // The newest first
  } catch (err) {
    console.error("Failed to fetch history:", err);
  }
}

  // --- Contract Actions ---
  const handlePay = async () => {
    try {
      const tx = await contract.pay({ value: ethers.parseEther(payAmount) });
      await tx.wait();
      alert("Payment successful!");
      connectWallet();
    } catch (err) { alert("Payment failed!"); }
  };

  const handleAddMember = async () => {
    try {
      // Input in solidity is array: address[]
      const tx = await contract.addMembers([newMemberAddress]);
      await tx.wait();
      alert("Member added successfully!");
      setNewMemberAddress("");
    } catch (err) { alert("Failed to add member!"); }
  };

  const handleWithdraw = async () => {
    try {
      const tx = await contract.withdraw(ethers.parseEther(withdrawAmount));
      await tx.wait();
      alert("Withdraw successful!");
      setWithdrawAmount("");
      connectWallet();
    } catch (err) { alert("Withdraw failed!"); }
  };

  const handleNextPeriod = async () => {
    try {
      const tx = await contract.nextPeriod();
      await tx.wait();
      alert("Period changed successfully!");
      connectWallet();
    } catch (err) { alert("Failed to change period!"); }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8">
          <div>
            <h1 className="text-2xl font-black text-indigo-600 tracking-tight">CLASSFUND v1.0</h1>
            <p className="text-slate-400 text-sm">Blockchain-Based Class Treasury</p>
          </div>
          {!address ? (
            <button onClick={connectWallet} className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200">
              Connect Wallet
            </button>
          ) : (
            <div className="mt-4 md:mt-0 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-mono text-indigo-700 font-bold">{address.slice(0,6)}...{address.slice(-4)}</span>
            </div>
          )}
        </header>

        {address && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Stats Cards */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Class Fund Total</span>
                  <div className="text-4xl font-black mt-2 text-slate-800">{balance} <span className="text-xl text-slate-300">ETH</span></div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Active Period</span>
                  <div className="text-4xl font-black mt-2 text-indigo-600">#{currentPeriod}</div>
                </div>
              </div>

              {/* Payment Box */}
              <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
                <h3 className="text-xl font-bold mb-4">Pay Class Fund</h3>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="flex-1 bg-indigo-500 border-none rounded-2xl p-4 text-white placeholder-indigo-300 focus:ring-2 focus:ring-white outline-none font-bold"
                  />
                  <button onClick={handlePay} className="bg-white text-indigo-600 px-8 rounded-2xl font-black hover:bg-indigo-50 transition-colors">
                    PAY NOW
                  </button>
                </div>
                <p className="mt-4 text-indigo-200 text-sm italic">Your total contribution: {userContribution} ETH</p>
              </div>
            </div>

            {/* Admin Panel */}
            <div className={`space-y-6 ${isTreasurer ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-amber-500 rounded-lg text-xs font-black">ADMIN</div>
                  <h3 className="font-bold text-lg text-slate-200">Treasurer Tools</h3>
                </div>

                {/* Withdraw Section */}
                <div className="mb-8">
                  <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Withdraw Funds</label>
                  <input 
                    placeholder="Amount in ETH" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-slate-800 border-none rounded-xl p-3 text-white mb-3"
                  />
                  <button onClick={handleWithdraw} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-black py-3 rounded-xl transition-all">
                    WITHDRAW
                  </button>
                </div>

                {/* Add Member Section */}
                <div className="mb-8">
                  <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Whitelist Member</label>
                  <input 
                    placeholder="0x... address" 
                    value={newMemberAddress}
                    onChange={(e) => setNewMemberAddress(e.target.value)}
                    className="w-full bg-slate-800 border-none rounded-xl p-3 text-white mb-3"
                  />
                  <button onClick={handleAddMember} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black py-3 rounded-xl transition-all">
                    ADD MEMBER
                  </button>
                </div>

                <button onClick={handleNextPeriod} className="w-full border border-slate-700 hover:bg-slate-800 text-slate-400 py-3 rounded-xl font-bold transition-all">
                  START NEXT PERIOD
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Transaction History Section */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg text-xl">📜</div>
            <h3 className="text-xl font-black text-slate-800">Transaction History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 font-bold">Payer</th>
                  <th className="pb-4 font-bold">Amount</th>
                  <th className="pb-4 font-bold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <tr key={index} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-mono text-sm text-indigo-600">
                        {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                        {tx.from.toLowerCase() === address.toLowerCase() && (
                          <span className="ml-2 text-[10px] bg-indigo-100 px-2 py-1 rounded-md">You</span>
                        )}
                      </td>
                      <td className="py-4 font-bold">{tx.amount} ETH</td>
                      <td className="py-4 text-sm text-slate-500">{tx.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-slate-400 italic">
                      No payment history yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}