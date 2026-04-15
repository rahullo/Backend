import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('token');
      if (saved) {
        setToken(saved);
        try {
          const { data } = await client.get('/auth/me', {
            headers: { Authorization: `Bearer ${saved}` },
          });
          setUser(data.user);
        } catch (_err) {
          await AsyncStorage.removeItem('token');
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    const { data } = await client.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const signup = async (name, email, password) => {
    const { data } = await client.post('/auth/signup', { name, email, password });
    await AsyncStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, loading, login, signup, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
