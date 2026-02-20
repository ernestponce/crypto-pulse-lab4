import { createContext, useState, useContext } from 'react';
<<<<<<< HEAD
import { useLocalStorage } from '../hooks/useLocalStorage';
=======
>>>>>>> b183b24f9c08c45a421d0020f4b5ff7f2eaad21a

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
<<<<<<< HEAD
  
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
=======
  const [currency, setCurrency] = useState('USD');

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
>>>>>>> b183b24f9c08c45a421d0020f4b5ff7f2eaad21a
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);