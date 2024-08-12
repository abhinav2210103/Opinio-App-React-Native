import React from 'react'
import 'react-native-reanimated';
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Index() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Redirect href={user ? '/login' : '/welcome'} />;
}
