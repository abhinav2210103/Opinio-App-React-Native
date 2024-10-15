import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { AuthContext } from '../contexts/AuthContext';
import AppLoader from '@/components/AppLoader';

export default function Index() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        if (token) {
          setUser({ token }); 
        } 
      } catch (error) {
        console.error("Error reading token", error);
      } finally {
        setLoading(false); 
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return <Redirect href={user ? '/home' : '/welcome'} />;
}
