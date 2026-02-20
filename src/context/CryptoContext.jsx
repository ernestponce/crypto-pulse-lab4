import { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  
  // Your two memory states
  const [currency, setCurrency] = useLocalStorage('appCurrency', 'USD');
  const [chartType, setChartType] = useLocalStorage('appChartType', 'line');

  const currencySymbol = 
    currency === 'USD' ? '$' : 
    currency === 'EUR' ? '€' : 
    currency === 'GBP' ? '£' : 
    currency === 'JPY' ? '¥' : 
    currency === 'PHP' ? '₱' : '$';

  return (
    <CryptoContext.Provider value={{ 
      coins, setCoins, 
      currency, setCurrency, currencySymbol, 
      chartType, setChartType 
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);