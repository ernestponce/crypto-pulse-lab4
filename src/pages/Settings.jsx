import { useCrypto } from '../context/CryptoContext';

export default function Settings() {
  const { currency, setCurrency, chartType, setChartType } = useCrypto();

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in duration-700">
      <div className="relative mb-10 group">
        <h2 className="text-3xl font-black tracking-[0.4em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] uppercase">
          System_Config
        </h2>
        <div className="h-1 w-full bg-cyan-900/30 mt-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-cyan-400 animate-[scan_3s_linear_infinite]"></div>
        </div>
      </div>

      <div className="bg-[#051324]/80 border border-cyan-500/30 p-8 rounded-2xl relative shadow-[0_0_20px_rgba(0,255,255,0.1)] flex flex-col gap-10">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

        {/* --- CURRENCY MODULE --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-900/50 pb-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-widest uppercase">Global_Currency_Node</h3>
            <p className="text-xs text-cyan-600 uppercase tracking-widest">Active Sync: <span className="text-cyan-400">{currency}</span></p>
          </div>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full md:w-64 bg-[#020b14] border border-cyan-500/50 text-cyan-300 p-3 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all uppercase tracking-widest cursor-pointer"
          >
            <option value="USD">USD // DOLLAR_US</option>
            <option value="EUR">EUR // EURO_EU</option>
            <option value="GBP">GBP // POUND_UK</option>
            <option value="JPY">JPY // YEN_JP</option>
            {/* ADDED PHP OPTION HERE */}
            <option value="PHP">PHP // PESO_PH</option>
          </select>
        </div>

        {/* --- CHART TYPE MODULE --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-widest uppercase">Radar_Visualization_Mode</h3>
            <p className="text-xs text-cyan-600 uppercase tracking-widest">Active Render: <span className="text-cyan-400">{chartType} GRAPH</span></p>
          </div>
          <select 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            className="w-full md:w-64 bg-[#020b14] border border-cyan-500/50 text-cyan-300 p-3 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all uppercase tracking-widest cursor-pointer"
          >
            <option value="line">LINE // TRAJECTORY</option>
            <option value="bar">BAR // VOLUME</option>
          </select>
        </div>
      </div>
    </div>
  );
}