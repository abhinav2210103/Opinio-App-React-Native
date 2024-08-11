import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../assets/images/LoginButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false); 
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
        className='flex-1 text-white px-3 h-20 text-xl'
      />
    </View>
          </View>

          <View className='w-[80%]'>
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
              className='flex-1 text-white px-3 text-xl'
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className='mr-3'>
                <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color="white"/>
              </TouchableOpacity>
            </View>
            <View className='flex justify-center items-end mr-2 mt-2'>
            <Text className='text-[#CD5C5C]' style={{ fontFamily: 'nunito' }}>Forgot Password ?</Text>
            </View>
          </View>

          <View className='relative flex justify-center items-center mt-10'>
            <LoginButton onPress={handleLogin} />
            <Text className='absolute text-[#FFFFFF] text-lg' style={{fontFamily:'mulish-black'}}>Login</Text>
          </View>

          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className='text-[#FFFFFF] mt-5 pb-2' style={{ fontFamily: 'nunito' }}>
              Don't have an account? <Text className='underline'>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient> 
    </SafeAreaView>
  );
}
