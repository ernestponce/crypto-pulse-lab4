import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen p-4 md:p-8">
          {/* Top HUD Frame */}
          <nav className="mb-8 border border-cyan-500/50 bg-[#051324]/80 p-5 shadow-[0_0_15px_rgba(0,255,255,0.2)] flex flex-col md:flex-row justify-between items-center relative">
            {/* Decorative Sci-Fi corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

            <div className="flex items-center gap-4">
              <div className="h-8 w-2 bg-cyan-400 animate-pulse"></div>
              <h1 className="text-2xl font-black tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
                SYS.CRYPTO_PULSE
              </h1>
            </div>
            
            <div className="flex gap-8 mt-4 md:mt-0 font-bold tracking-widest text-sm">
              <Link to="/" className="text-cyan-600 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">MARKET_DATA</Link>
              <Link to="/analysis" className="text-cyan-600 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">RADAR_ANALYSIS</Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  );
}
export default App;