import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leftMainData, setLeftMainData] = useState('');

  const updateLeftMainData = (data) => {
    setLeftMainData(data);
  };

  return (
    <DataContext.Provider value={{ leftMainData, updateLeftMainData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
