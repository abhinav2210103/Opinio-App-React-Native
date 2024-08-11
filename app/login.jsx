import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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
    <SafeAreaView className='flex-1'>
      <LinearGradient
        colors={['hsla(242, 64%, 20%, 1)', 'hsla(256, 47%, 31%, 1)']}
        className='flex-1'
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View className='flex items-center h-full justify-center'>
          <View className='flex items-center justify-center'>
          <Text className='text-7xl text-[#FFFFFF] mb-20 pt-5' style={{fontFamily:'baloo-semi'}}>
            Sign In
          </Text>
          </View>

          <View className='w-[80%]'>
            <Text className='text-base text-[#FFFFFF] mb-2 ' style={{ fontFamily: 'nunito' }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              className='border-2 border-[#228B22] rounded-2xl text-white h-14 px-3 mb-4'
            />
          </View>

          <View className='w-[80%]'>
            <Text className='text-base text-[#FFFFFF] mb-2 ' style={{ fontFamily: 'nunito' }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className='border-2 border-white rounded-2xl text-white h-14 px-3 mb-2'
            />
            <View className='flex justify-center items-end mr-2 mt-2'>
            <Text className='text-[#CD5C5C]' style={{ fontFamily: 'nunito' }}>Forgot Password ?</Text>
            </View>
          </View>

          <View className='relative flex justify-center items-center mt-10'>
            <LoginButton onPress={handleLogin} />
            <Text className='absolute text-[#FFFFFF] text-base font-black'>Login</Text>
          </View>

          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className='text-[#FFFFFF] mt-5' style={{ fontFamily: 'nunito' }}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient> 
    </SafeAreaView>
  );
}
