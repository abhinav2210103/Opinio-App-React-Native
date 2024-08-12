import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid, SafeAreaView } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AppLoader from '@/components/AppLoader';
import LoginButton from '../assets/images/LoginButton';

export default function Forgotpassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (step === 0) {
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/forgotPassword`, { email });
        if (response.data.message) {
          setStep(1);
        } else {
          ToastAndroid.show(response.data.message || 'Error', ToastAndroid.LONG);
        }
      } catch (error) {
        ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    } else if (step === 1) {
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/otpverify`, { email, otp });
        if (response.data.message) {
          setStep(2);
        } else {
          ToastAndroid.show(response.data.message || 'Invalid OTP', ToastAndroid.LONG);
        }
      } catch (error) {
        ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      // Reset Password
      if (newPassword !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/resetforgotPassword`, { email, otp, newPassword });
        if (response.data.message) {
          ToastAndroid.show('Password reset successfully', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(response.data.message || 'Error', ToastAndroid.LONG);
        }
      } catch (error) {
        ToastAndroid.show('An error occurred. Please try again.', ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
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
            <Text className='text-5xl text-[#FFFFFF] mb-10 pt-5' style={{ fontFamily: 'baloo-semi' }}>
              Forgot Password
            </Text>
          </View>
          {step === 0 && (
            <View className='w-[80%]'>
              <Text className='text-2xl text-[#FFFFFF] mb-4' style={{ fontFamily: 'nunito-bold' }}>Enter your email</Text>
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
            <View className='relative flex justify-center items-center mt-10'>
            <TouchableOpacity onPress={handleNext} className='flex justify-center items-center'>
              <LoginButton />
              <Text className='absolute text-[#FFFFFF] text-lg' style={{ fontFamily: 'mulish-black' }}>Submit</Text>
            </TouchableOpacity>
          </View>
            </View>
          )}
          {step === 1 && (
            <View className='w-[80%]'>
              <Text className='text-2xl text-[#FFFFFF] mb-4' style={{ fontFamily: 'nunito-bold' }}>Verify OTP</Text>
              <View className='flex-row items-center border-2 border-[#228B22] rounded-2xl h-14'>
              <TextInput
                 value={otp}
                 onChangeText={setOtp}
                 keyboardType="numeric"
                className='flex-1 text-white px-3 h-full text-xl'
              />
              </View>
              <TouchableOpacity onPress={handleNext} className='flex justify-center items-center mt-5'>
              <LoginButton />
              <Text className='absolute text-[#FFFFFF] text-lg' style={{ fontFamily: 'mulish-black' }}>Verify OTP</Text>
            </TouchableOpacity>
            </View>
          )}
          {step === 2 && (
            <View className='w-[80%]'>
              <Text className='text-base text-[#FFFFFF] mb-2' style={{ fontFamily: 'nunito-bold' }}>
               New Password
              </Text>
              <View className='flex-row items-center border-2 border-[#228B22] rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="locked" size={24} color="white" />
              </View>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                className='flex-1 text-white px-3 h-full text-xl'
              />
              </View>
              <Text className='text-base text-[#FFFFFF] my-2' style={{ fontFamily: 'nunito-bold' }}>
               Confirm New Password
              </Text>
              <View className='flex-row items-center border-2 border-[#228B22] rounded-2xl h-14'>
              <View className='pl-3'>
                <Fontisto name="locked" size={24} color="white" />
              </View>
              <TextInput
                 value={confirmPassword}
                 onChangeText={setConfirmPassword}
                 secureTextEntry
                className='flex-1 text-white px-3 h-full text-xl'
              />
              </View>
             <TouchableOpacity onPress={handleNext} className='flex justify-center items-center mt-7'>
              <LoginButton />
              <Text className='absolute text-[#FFFFFF] text-lg' style={{ fontFamily: 'mulish-black' }}>Submit</Text>
            </TouchableOpacity>
            </View>
          )}
          {loading && <AppLoader />}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
