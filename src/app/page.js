'use client'

import WebSocketClient from '../components/WebSocketClient';
// After renaming
import CoinScanner from '../components/CoinScanner';

export default function Home() {
  return <div>
    <WebSocketClient />
    <CoinScanner />
  </div>;
}
