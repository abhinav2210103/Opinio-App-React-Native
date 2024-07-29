import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXPO_APP_BASE_URL } from '@env';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.EXPO_APP_BASE_URL}/user/signin`,{email,password},{
        withCredentials: true,
      });

      if (response.data.msg === 'User Logged In') {
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
          const token = setCookieHeader[0].split(';')[0].split('=')[1];
          await AsyncStorage.setItem('token', token);
          router.replace('/home');
        } else {
          Alert.alert('Error', 'No token received');
        }
      } else {
        Alert.alert('Error', response.data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <SafeAreaView>
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text>New to the app?</Text>
      <Button title="Sign Up" onPress={() => router.push('/signup')} />
    </View>
    </SafeAreaView>
  );
}
