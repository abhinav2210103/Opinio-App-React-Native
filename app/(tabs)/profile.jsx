import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import React from 'react'

export default function profile () {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/welcome');
  };
  return (
    <SafeAreaView>
    <View>
      <Text>profile</Text>
      <Button title="Logout" onPress={handleLogout}/>
    </View>
    </SafeAreaView>
  )
}