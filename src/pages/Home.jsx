import { useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Home() {
  const { loading, error } = useFetchCrypto();
  
  // Pulling currency and symbol from your global state
  const { coins, currency, currencySymbol } = useCrypto(); 
  
  const [search, setSearch] = useLocalStorage('cryptoSearch', '');
  const searchInputRef = useRef(null);

  // Auto-focuses the input when loaded
  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, [loading]);

  const filteredCoins = coins ? coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-[#0f3460] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent animate-spin shadow-[0_0_15px_rgba(0,255,255,0.5)]"></div>
          <div className="absolute inset-4 border-2 border-cyan-600 rounded-full border-b-transparent animate-[spin_5s_linear_infinite_reverse]"></div>
        </div>
        <div className="text-cyan-400 tracking-[0.3em] font-mono animate-pulse text-lg">
          >> DECRYPTING_BLOCKCHAIN_DATA...
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center mt-20 text-xl tracking-widest uppercase">Err_Connection_Failed: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-1000">
      <div className="mb-8 flex justify-between items-end border-b border-cyan-500/30 pb-4">
        <div className="w-full max-w-md relative">
          <div className="text-xs text-cyan-500 mb-2 tracking-widest uppercase">>> Input_Query</div>
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
        <div className="hidden md:block text-right text-xs text-cyan-600 tracking-widest space-y-1 uppercase">
          <p>Status: <span className="text-cyan-400">Online</span></p>
          <p>Nodes: <span className="text-cyan-400">{coins ? coins.length : 0}</span></p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="relative bg-[#020b14]/80 border border-cyan-800 p-5 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all group overflow-hidden cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] blur-[2px]"></div>
            
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 bg-cyan-700"></div>
              <div className="w-1.5 h-1.5 bg-cyan-700"></div>
              <div className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
            </div>

            <div className="text-xs text-cyan-600 mb-1 tracking-widest">ID: {coin.symbol.toUpperCase()}</div>
            <h3 className="text-xl text-cyan-100 font-bold tracking-widest mb-4 uppercase">{coin.name}</h3>
            
            <div className="flex justify-between items-end border-t border-cyan-900 pt-3">
              
              {/* --- DYNAMIC CURRENCY FIX IS HERE --- */}
              <div>
                <div className="text-xs text-cyan-600 tracking-widest uppercase">Value({currency})</div>
                <div className="text-lg text-cyan-300 font-mono">
                  {currencySymbol}{coin.current_price?.toLocaleString()}
                </div>
              </div>
              
              <div className={`text-sm font-bold tracking-wider ${coin.price_change_percentage_24h > 0 ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]'}`}>
                {coin.price_change_percentage_24h > 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}