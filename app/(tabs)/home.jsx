import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/welcome');
  };

  return (
    <SafeAreaView>
    <View>
      <Text>Welcome to the Home Page!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
    </SafeAreaView>
  );
}
