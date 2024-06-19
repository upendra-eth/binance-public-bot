// Copyright 2024 user
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// page.js
import { useEffect, useState } from 'react';

const WebSocketClient =()=> {
  const [btcPrice, setBtcPrice] = useState('Loading...');
  const [ethPrice, setEthPrice] = useState('Loading...');
  let btcWebSocket, ethWebSocket;

  useEffect(() => {
    btcWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
    ethWebSocket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');

    btcWebSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBtcPrice(data.c); // Update BTC price
    };

    ethWebSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEthPrice(data.c); // Update ETH price
    };

    btcWebSocket.onclose = () => {
      console.log('BTC WebSocket closed');
    };

    ethWebSocket.onclose = () => {
      console.log('ETH WebSocket closed');
    };

    return () => {
      btcWebSocket.close();
      ethWebSocket.close();
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Binance WebSocket Data</h1>
      <div className="text-center">
        <p className="text-xl">BTC/USDT: {btcPrice}</p>
        <p className="text-xl">ETH/USDT: {ethPrice}</p>
      </div>
    </div>
  );
}

export default WebSocketClient;