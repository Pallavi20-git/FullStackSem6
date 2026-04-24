import { createContext, useState } from 'react';

// Create the global context
export const GlobalContext = createContext();

// Create the Provider component
export const GlobalProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  // Global state management functions
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Global state object
  const globalState = {
    count,
    incrementCount,
    decrementCount,
    resetCount,
    theme,
    toggleTheme
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};
