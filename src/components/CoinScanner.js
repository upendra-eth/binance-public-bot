// src/components/CoinScanner.js
import { useEffect, useState } from 'react';
import WebSocket from 'isomorphic-ws'; // WebSocket library compatible with Node.js and browsers
import { throttle } from '../utils/throttle';

const CoinScanner = () => {
  const [filteredCoinsData, setFilteredCoinsData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=!miniTicker@arr');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    const handleMessage = throttle((event) => {
      const eventData = JSON.parse(event.data);
      const coinUpdates = eventData.data;

      // Process each coin update
      const updatedCoins = coinUpdates.map(update => {
        const currentPrice = parseFloat(update.c);
        const openPrice = parseFloat(update.o);
        const changePercent = ((currentPrice - openPrice) / openPrice) * 100;

        return {
          symbol: update.s,
          price: currentPrice,
          changePercent: changePercent,
          volume: parseFloat(update.q),
        };
      });

      // Filter coins based on criteria
      const filteredCoins = updatedCoins.filter(coin => coin.changePercent > 10);

      // Update state with filtered coin data
      setFilteredCoinsData(filteredCoins);

      // Implement your strategy logic here
      scanCoins(filteredCoins);
    }, 5000); // Throttle updates to every 10 seconds

    ws.onmessage = handleMessage;

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close(); // Clean up WebSocket connection
    };
  }, []);

  const scanCoins = (coins) => {
    // Example: Scan for coins with a price increase of more than 5% and high volume
    const filteredCoins = coins.filter(coin => coin.changePercent > 5 && coin.volume > 1000);

    
    if (filteredCoins.length > 0) {
      console.log('Found coins matching criteria:', filteredCoins);
      // Implement trading logic here (e.g., send buy/sell orders)
      buyCoins(filteredCoins[0].symbol);
    }
  };

  const buyCoins = (symbol) => {
    // Placeholder function for buying coins
    console.log(`Buying ${symbol}...`);
    // Implement actual trading logic here
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Binance Coin Scanner</h1>
      <div className="grid grid-cols-1 gap-4">
        {filteredCoinsData.map((coin, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{coin.symbol}</h2>
            <p>Price: {coin.price.toFixed(2)}</p>
            <p>Change: {coin.changePercent.toFixed(2)}%</p>
            <p>Volume: {coin.volume.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinScanner;
