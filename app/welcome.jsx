import React from 'react'
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../assets/images/Logo';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView>
    <View>
       <View className=' flex items-center justify-center'>
          <Logo width={120} height={120} className=''/>
        </View>
      <Text>Welcome to the App!</Text>
      <Button title="Login" onPress={() => router.push('/login')} />
      <Button title="Sign Up" onPress={() => router.push('/signup')} />
    </View>
    </SafeAreaView>
  );
}
