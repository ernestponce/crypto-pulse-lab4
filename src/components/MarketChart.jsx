import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins, currencySymbol, chartType } = useCrypto();
  
  if (!coins || coins.length === 0) return null;

  const chartData = coins.map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#051324]/95 border border-cyan-500 p-3 shadow-[0_0_15px_rgba(0,255,255,0.4)]">
          <p className="text-cyan-100 font-bold tracking-widest">{label}</p>
          <p className="text-cyan-400 font-mono mt-1">{`Value: ${currencySymbol}${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative border border-cyan-500/50 bg-[#051324]/80 p-6 shadow-[0_0_20px_rgba(0,255,255,0.15)] mt-4 mb-10 group">
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>
      
      <div className="flex justify-between items-center mb-8 border-b border-cyan-500/30 pb-3">
        <h2 className="text-cyan-400 font-bold tracking-[0.2em] text-lg uppercase">Radar // Market_Analysis</h2>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          <span className="text-xs text-cyan-500 tracking-widest font-bold uppercase">Live_Feed ({chartType})</span>
        </div>
      </div>
      
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" vertical={false} />
              <XAxis dataKey="name" stroke="#0ea5e9" tick={{fill: '#38bdf8', fontSize: 12, fontFamily: 'monospace'}} axisLine={{stroke: '#0369a1', strokeWidth: 2}} tickLine={{stroke: '#0369a1'}} />
              <YAxis stroke="#0ea5e9" tick={{fill: '#38bdf8', fontSize: 12, fontFamily: 'monospace'}} axisLine={{stroke: '#0369a1', strokeWidth: 2}} tickLine={{stroke: '#0369a1'}} tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(34,211,238,0.2)', strokeWidth: 2 }} />
              <Line type="stepAfter" dataKey="price" stroke="#00f0ff" strokeWidth={3} dot={{ r: 4, fill: '#051324', stroke: '#00f0ff', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#00f0ff', stroke: '#fff', strokeWidth: 2, filter: 'drop-shadow(0px 0px 8px rgba(0,255,255,0.8))' }} />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" vertical={false} />
              <XAxis dataKey="name" stroke="#0ea5e9" tick={{fill: '#38bdf8', fontSize: 12, fontFamily: 'monospace'}} axisLine={{stroke: '#0369a1', strokeWidth: 2}} tickLine={{stroke: '#0369a1'}} />
              <YAxis stroke="#0ea5e9" tick={{fill: '#38bdf8', fontSize: 12, fontFamily: 'monospace'}} axisLine={{stroke: '#0369a1', strokeWidth: 2}} tickLine={{stroke: '#0369a1'}} tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34,211,238,0.05)' }} />
              <Bar dataKey="price" fill="#00f0ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default MarketChart;