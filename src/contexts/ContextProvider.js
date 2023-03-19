import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', '');
  const [progress, setProgress] = useLocalStorage('progress', '');
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        progress,
        setProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
