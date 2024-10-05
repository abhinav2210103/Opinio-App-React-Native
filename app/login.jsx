import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../assets/images/LoginButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AppLoader from '../components/AppLoader';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show('Please fill in both email and password', ToastAndroid.LONG);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/signin`, { email, password });

      if (response.data.msg === 'User Logged In') {
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader && setCookieHeader.length > 0) {
          const token = setCookieHeader[0].split(';')[0].split('=')[1];
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          login(token);
          router.push('/home');
        } else {
          ToastAndroid.show('Failed to retrieve authentication token', ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.show(response.data.error || 'Invalid Credentials', ToastAndroid.LONG);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred during login.';
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
        <View className='flex-1 justify-center items-center'>
          <View className='flex items-center'>
            <Text className='text-7xl text-[#FFFFFF] mb-20 pt-5' style={{ fontFamily: 'baloo-semi' }}>
              Sign In
            </Text>
          </View>

          <View className='w-[80%]'>
            <Text className='text-base text-[#FFFFFF] mb-2' style={{ fontFamily: 'nunito-bold' }}>
              Email
            </Text>
            <View className='flex-row items-center border-2 border-[#228B22] rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="email" size={24} color='white' />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className='flex-1 text-white px-3 h-full text-xl'
              />
            </View>
          </View>

          <View className='w-[80%] mt-5'>
            <Text className='text-base text-[#FFFFFF] mb-2' style={{ fontFamily: 'nunito-bold' }}>
              Password
            </Text>
            <View className='flex-row items-center border-2 border-white rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="locked" size={24} color="white" />
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                className='flex-1 text-white px-3 text-xl'
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className='mr-3'>
                <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className='flex justify-center items-end mr-2 mt-2'>
              <TouchableOpacity onPress={() => router.push('/forgotpassword')}>
                <Text className='text-[#CD5C5C]' style={{ fontFamily: 'nunito' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='relative flex justify-center items-center mt-10'>
            <TouchableOpacity onPress={handleLogin} className='flex justify-center items-center'>
              <LoginButton />
              <Text className='absolute text-[#FFFFFF] text-lg' style={{ fontFamily: 'mulish-black' }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className='text-[#FFFFFF] mt-5 pb-2' style={{ fontFamily: 'nunito' }}>
              Don't have an account? <Text className='underline'>Sign up</Text>
            </Text>
          </TouchableOpacity>
          {loading && <AppLoader />}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
