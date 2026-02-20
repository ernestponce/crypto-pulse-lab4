import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Settings from './pages/Settings';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen p-4 md:p-8">
          <nav className="mb-8 border border-cyan-500/50 bg-[#051324]/80 p-5 shadow-[0_0_15px_rgba(0,255,255,0.2)] flex flex-col md:flex-row justify-between items-center relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

            <div className="flex items-center gap-4">
              <div className="h-8 w-2 bg-cyan-400 animate-pulse"></div>
              <h1 className="text-2xl font-black tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
                SYS.CRYPTO_PULSE
              </h1>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0 font-bold tracking-widest text-sm uppercase">
              <Link to="/" className="text-cyan-600 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">Market_Data</Link>
              <Link to="/analysis" className="text-cyan-600 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all">Radar_Analysis</Link>
              <Link to="/settings" className="text-cyan-600 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all border-l border-cyan-800 pl-6 flex items-center gap-2">
                ⚙️ Config
              </Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  );
}
export default App;