import React from 'react'
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { useFonts } from 'expo-font';
export default function Layout() {
  useFonts(
    {
      'mulish':require('../assets/fonts/Mulish-Regular.ttf'),
      'nunito':require('../assets/fonts/Nunito-Regular.ttf'),
      'baloo-semi':require('../assets/fonts/Baloo2-SemiBold.ttf'),
      'mulish-black':require('../assets/fonts/Mulish-Black.ttf'),
      'nunito-bold':require('../assets/fonts/Nunito-Bold.ttf'),
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