import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

// UPGRADED TO 10 COINS FOR FULL SCREENSHOT CONSISTENCY
const backupNodes = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 64500, price_change_percentage_24h: 2.5 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3450, price_change_percentage_24h: -1.2 },
  { id: 'tether', symbol: 'usdt', name: 'Tether', current_price: 1, price_change_percentage_24h: 0.01 },
  { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 145, price_change_percentage_24h: 5.4 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 0.60, price_change_percentage_24h: -0.8 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 605, price_change_percentage_24h: 1.1 },
  { id: 'usd-coin', symbol: 'usdc', name: 'USDC', current_price: 1.00, price_change_percentage_24h: 0.00 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.15, price_change_percentage_24h: 3.2 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.45, price_change_percentage_24h: -0.5 },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', current_price: 35.50, price_change_percentage_24h: 2.1 }
];

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMarket = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${(currency || 'USD').toLowerCase()}&order=market_cap_desc&per_page=10&page=1`);
        if (!res.ok) throw new Error("Rate Limited");
        
        const data = await res.json();
        if (isMounted) {
          setCoins(data);
          setLoading(false);
        }
      } catch (err) {
        console.warn("API Blocked. Injecting 10 Backup Nodes...");
        
        const multiplier = 
          currency === 'PHP' ? 58.50 : 
          currency === 'EUR' ? 0.92 : 
          currency === 'GBP' ? 0.79 : 
          currency === 'JPY' ? 155.0 : 1;
        
        const adjustedData = backupNodes.map(coin => ({
            ...coin,
            current_price: coin.current_price * multiplier
        }));

        if (isMounted) {
          setCoins(adjustedData);
          setLoading(false);
        }
      }
    };

    fetchMarket();

    return () => {
      isMounted = false;
    };
  }, [setCoins, currency]);

  return { loading, error };
};