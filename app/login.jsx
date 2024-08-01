import React from 'react'
import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Logo from '../assets/images/Logo'


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/signin`, { email, password });
      if (response.data.msg === 'User Logged In') {
        const token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
        login(token);
        router.push('/home');
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
        <Text className='text-3xl'>Email dalo bhai</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
        <Text>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
        <Button title="Login" onPress={handleLogin} />
        <Logo/>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={{ color: 'blue', marginTop: 20 }}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
