import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView>
    <View>
      <Text>Welcome to the App!</Text>
      <Button title="Login" onPress={() => router.push('/login')} />
      <Button title="Sign Up" onPress={() => router.push('/signup')} />
    </View>
    </SafeAreaView>
  );
}
