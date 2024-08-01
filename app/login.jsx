import React from 'react'
import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Logo from '../assets/images/Logo';
import LoginButton from '../assets/images/LoginButton'


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
      <View className='bg-cover bg-[#131232] h-screen'>
        <View className='flex justify-center items-center'>
      <Logo width={120} height={120} className=''/>
      </View>
        <Text className='text-3xl text-white'>Email dalo bhai</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" className='border-2 border-white' />
        <Text className='text-white'>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry className='border-2 border-white' />
        <View className='relative flex justify-center items-center mt-10'>
        <LoginButton onPress={handleLogin}/>
        <Text className='absolute text-[#FFFFFF] text-base font-black'>Login</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={{ color: 'blue', marginTop: 20 }}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
