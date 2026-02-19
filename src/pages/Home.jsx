import { useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Home() {
  const { loading, error } = useFetchCrypto();
  const { coins } = useCrypto();
  const [search, setSearch] = useLocalStorage('cryptoSearch', '');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, [loading]);

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-white text-center mt-10 text-2xl">Scanning Blockchain...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  return (
    <div className="p-8">
      <input 
        ref={searchInputRef}
        type="text" 
        placeholder="Search coins..." 
        className="mb-6 p-2 rounded bg-gray-700 text-white w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-xl text-white font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
            <p className="text-gray-300">Price: ${coin.current_price}</p>
            <p className={`font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
              24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}