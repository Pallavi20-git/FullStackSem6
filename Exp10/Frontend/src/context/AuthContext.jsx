/**
 * AuthContext.jsx
 * Global auth state provider — token, login, logout, isAuthenticated.
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { saveToken, getToken, removeToken } from '../utils/tokenStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken());

  const login = useCallback((newToken) => {
    saveToken(newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setToken(null);
  }, []);

  const value = useMemo(() => ({
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }), [token, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
