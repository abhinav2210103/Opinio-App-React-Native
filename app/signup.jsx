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

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/signup`, {
        fullName,
        email,
        password
      });
  
      if (response.data.success) {
        ToastAndroid.show('User created successfully. Please verify your email.', ToastAndroid.LONG);
        router.push('/login');
      } else {
        ToastAndroid.show(response.data.message || 'An error occurred', ToastAndroid.LONG);
        Alert.alert('Error', response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      ToastAndroid.show('An error occurred during signup.', ToastAndroid.LONG);
      Alert.alert('Error', 'An error occurred during signup.');
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
            <LoginButton onPress={handleSignup} />
            <Text className='absolute text-[#FFFFFF] text-lg' style={{ fontFamily: 'mulish-black' }}>Send Verification Link</Text>
          </View>
          {loading && (
            <View className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
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