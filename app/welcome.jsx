import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/images/Logo';
import LoginButton from '../assets/images/LoginButton';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';


export default function Welcome() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const handlelogout = () => {
    logout();
  }

  return (
    <SafeAreaView className='flex-1'>
      <LinearGradient
        colors={['hsla(242, 47%, 13%, 1)', 'hsla(256, 31%, 23%, 1)']}  
        className='flex-1'
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View className='flex items-center justify-center h-full'>
          <View className='mb-5'>
            <Logo width={250} height={250} />
          </View>
          <Text className='text-4xl text-[#FFFFFF] mb-5' style={{ fontFamily: 'baloo-semi' }}>
            Welcome to the App!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/login')}
          >
          <View className='relative flex justify-center items-center mt-10'>
            <LoginButton />
            <Text className='absolute text-[#FFFFFF] text-lg' style={{fontFamily:'mulish-black'}}>Login</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
                onPress={() => router.push('/signup')}
                className='bg-[#00000000] p-3 border-[#700CCF] border-2 w-72 rounded-3xl mt-8 mb-20'
                >
                  <Text className='text-[#FFFFFF] text-lg text-center ' style={{ fontFamily: 'nunito-bold' }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlelogout}>
                  <Text>Logout</Text>
                </TouchableOpacity>
            </View>
      </LinearGradient>
    </SafeAreaView>
  );
}