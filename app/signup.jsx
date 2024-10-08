import React from 'react'
import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity ,ToastAndroid,ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import LoginButton from '../assets/images/LoginButton';
import AppLoader from '@/components/AppLoader';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.LONG);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show('Please enter a valid email address', ToastAndroid.LONG);
      return;
    }
    if (password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters long', ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/signup`, {
        fullName,
        email,
        password
      });    
      const { success, message } = response.data;
      if (success) {
        ToastAndroid.show(message || 'User created successfully. Please verify your email.', ToastAndroid.LONG);
        router.push('/login');
      } else {
        ToastAndroid.show(message || 'An error occurred during signup.', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during signup.';
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };
  
   return (
    <SafeAreaView className='flex-1'>
      <LinearGradient
        colors={['hsla(242, 47%, 13%, 1)', 'hsla(256, 31%, 23%, 1)']}
        className='flex-1'
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View className='flex items-center h-full justify-center'>
          <View className='flex items-center justify-center'>
            <Text className='text-7xl text-[#FFFFFF]  pt-5' style={{ fontFamily: 'baloo-semi' }}>
              Sign Up
            </Text>
          </View>

          <View className='w-[80%]'>
            <Text className='text-base text-[#FFFFFF] mb-2 ' style={{ fontFamily: 'nunito-bold' }}>
              Full Name
            </Text>
            <View className='flex-row items-center border-2 border-[#228B22] rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="person" size={24} color='white'/> 
              </View>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                className='flex-1 text-white px-3 h-full text-xl'
              />
            </View>
          </View>

          <View className='w-[80%] mt-4'>
            <Text className='text-base text-[#FFFFFF] mb-2 ' style={{ fontFamily: 'nunito-bold' }}>
              Email
            </Text>
            <View className='flex-row items-center border-2 border-[#228B22] rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="email" size={24} color='white'/>
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className='flex-1 text-white px-3 h-full text-xl'
              />
            </View>
          </View>

          <View className='w-[80%] mt-4'>
            <Text className='text-base text-[#FFFFFF] mb-2 ' style={{ fontFamily: 'nunito-bold' }}>
              Password
            </Text>
            <View className='flex-row items-center border-2 border-white rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="locked" size={24} color="white"/>  
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                className='flex-1 text-white px-3 h-full text-xl'
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className='mr-3'>
                <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color="white"/>
              </TouchableOpacity>
            </View>
          </View>

          <View className='relative flex justify-center items-center mt-10'>
            <TouchableOpacity onPress={handleSignup} className='flex justify-center items-center'>
            <LoginButton  />
            <Text className='absolute text-[#FFFFFF] text-lg' style={{ fontFamily: 'mulish-black' }}>Send Verification Link</Text>
            </TouchableOpacity>
          </View>
          {loading && <AppLoader />}
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className='text-[#FFFFFF] mt-5 pb-2' style={{ fontFamily: 'nunito' }}>
              Already have an account? <Text className='underline'>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient> 
    </SafeAreaView>
  );
}