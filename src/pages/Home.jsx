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

  if (loading) return <div className="text-cyan-400 text-center mt-20 text-2xl tracking-widest animate-pulse">ESTABLISHING SECURE CONNECTION...</div>;
  if (error) return <div className="text-red-500 text-center mt-20 text-xl tracking-widest">ERR_CONNECTION_FAILED: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end border-b border-cyan-500/30 pb-4">
        <div className="w-full max-w-md relative">
          <div className="text-xs text-cyan-500 mb-2 tracking-widest">>> INPUT_QUERY</div>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="SCAN_ASSET..." 
            className="w-full bg-[#051324] border border-cyan-500/50 text-cyan-300 p-3 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all uppercase tracking-widest placeholder-cyan-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-4 top-10 w-2 h-4 bg-cyan-400 animate-pulse"></div>
        </div>
        <div className="hidden md:block text-right text-xs text-cyan-600 tracking-widest space-y-1">
          <p>STATUS: <span className="text-cyan-400">ONLINE</span></p>
          <p>NODES: <span className="text-cyan-400">{coins.length}</span></p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="relative bg-[#020b14]/80 border border-cyan-800 p-5 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all group overflow-hidden cursor-pointer">
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] blur-[2px]"></div>
            
            {/* Top Right decorative dots */}
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 bg-cyan-700"></div>
              <div className="w-1.5 h-1.5 bg-cyan-700"></div>
              <div className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
            </div>

            <div className="text-xs text-cyan-600 mb-1 tracking-widest">ID: {coin.symbol.toUpperCase()}</div>
            <h3 className="text-xl text-cyan-100 font-bold tracking-widest mb-4">{coin.name.toUpperCase()}</h3>
            
            <div className="flex justify-between items-end border-t border-cyan-900 pt-3">
              <div>
                <div className="text-xs text-cyan-600 tracking-widest">VALUE(USD)</div>
                <div className="text-lg text-cyan-300 font-mono">${coin.current_price.toLocaleString()}</div>
              </div>
              <div className={`text-sm font-bold tracking-wider ${coin.price_change_percentage_24h > 0 ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]'}`}>
                {coin.price_change_percentage_24h > 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}