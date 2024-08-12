import React from 'react'
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUser({ token });
      }
    };
    checkUser();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('token', token);
    setUser({ token });
    console.log("User Logged IN")
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    console.log("user logout");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
