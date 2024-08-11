import React from 'react'
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { useFonts } from 'expo-font';
import { unsubscribeFromKeyboardEvents } from 'react-native-reanimated/lib/typescript/reanimated2/core';

export default function Layout() {
  useFonts(
    {
      'mulish':require('../assets/fonts/Mulish-Regular.ttf')
    }
  )
  
  return (
    <AuthProvider>    
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
      </AuthProvider>

  );
}