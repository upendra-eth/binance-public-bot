'use client';

// src/components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    console.log('Connecting to Binance wallet...');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          {/* <Link href="/"> */}
            <a className="text-xl font-bold">Binance Trading Bot</a>
          {/* </Link> */}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
