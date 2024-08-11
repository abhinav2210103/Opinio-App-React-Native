import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/images/Logo';
import LoginButton from '../assets/images/LoginButton';

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
    <SafeAreaView style={{ flex: 1 }}>
     <LinearGradient
      colors={['hsla(242, 64%, 20%, 1)', 'hsla(256, 47%, 31%, 1)']}
      className='h-screen'
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}>
        <View>
          <Text className='text-2xl' style={{
            fontFamily:'mulish'
          }}>
            Sign In
          </Text>
        </View>
        <Text className='text-3xl text-white'>Email dalo bhai</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className='border-2 border-white text-white'
        />
        <Text className='text-white'>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className='border-2 border-white text-white'
        />
        <View className='relative flex justify-center items-center mt-10'>
          <LoginButton onPress={handleLogin}/>
          <Text className='absolute text-[#FFFFFF] text-base font-black'>Login</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={{ color: 'blue', marginTop: 20 }}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}
