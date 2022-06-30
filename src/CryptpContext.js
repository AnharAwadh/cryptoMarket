import React, { createContext,useContext ,useEffect, useState} from 'react'


const crypto=createContext()

const CryptpContext = ({ children }) => {
 const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  useEffect(() => {
    if (currency === "BIC") setSymbol("₿");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <crypto.Provider value={{ currency, setCurrency, symbol }}>
    {children}
  </crypto.Provider>
);
  
}

export default CryptpContext

export const CryptoState = () => {
    return useContext(crypto);
  };