import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function Profile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({});
  const [step, setStep] = useState(0);
  const [newFullName, setNewFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = '';
    router.replace('/welcome');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/user/profile`);
        setUserProfile(response.data);
        setNewFullName(response.data.fullName); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      if (newFullName !== userProfile.fullName) {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/resetusername`, { newFullName });
        if (response.status === 200) {
          setUserProfile((prev) => ({ ...prev, fullName: newFullName }));
          Alert.alert('Success', 'Username updated successfully');
        }
      }

      if (newPassword) {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/resetpassword`, { currentPassword, newPassword });
        if (response.status === 200) {
          Alert.alert('Success', 'Password updated successfully');
        }
      }
      setStep(0);
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes');
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
          {step === 0 ? (
            <>
              <Text className='text-5xl text-white mb-20' style={{ fontFamily: 'baloo-semi' }}>
                Profile
              </Text>

              <View className='w-[80%] grid grid-cols-2 gap-4'>
                <View className='bg-[#8B4513] rounded-2xl h-20 justify-center items-center'>
                  <Text className='text-white text-lg' style={{ fontFamily: 'nunito-bold' }}>
                    Total Likes: {userProfile.totalLikes}
                  </Text>
                </View>

                <View className='bg-[#4682B4] rounded-2xl h-20 justify-center items-center'>
                  <Text className='text-white text-lg' style={{ fontFamily: 'nunito-bold' }}>
                    Total Comments: {userProfile.totalComments}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => setStep(1)} className='bg-[#228B22] rounded-2xl h-20 justify-center items-center'>
                  <Text className='text-white text-lg' style={{ fontFamily: 'nunito-bold' }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className='bg-[#CD5C5C] rounded-2xl h-20 justify-center items-center'>
                  <Text className='text-white text-lg' style={{ fontFamily: 'nunito-bold' }}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View className='w-[80%]'>
              <TextInput
                value={newFullName}
                onChangeText={setNewFullName}
                placeholder="Current Username"
                className='bg-white rounded-2xl h-12 mb-4 px-4'
              />

              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Current Password"
                secureTextEntry
                className='bg-white rounded-2xl h-12 mb-4 px-4'
              />

              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                secureTextEntry
                className='bg-white rounded-2xl h-12 mb-4 px-4'
              />

              <TouchableOpacity onPress={handleSaveChanges} className='bg-[#228B22] rounded-2xl h-12 justify-center items-center'>
                <Text className='text-white text-lg' style={{ fontFamily: 'nunito-bold' }}>
                  Save Changes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep(0)} className='mt-4 bg-gray-500 rounded-2xl h-12 justify-center items-center'>
                <Text className='text-white text-lg' style={{ fontFamily: 'nunito-bold' }}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 0 && (
            <TouchableOpacity onPress={handleLogout} className='mt-10 bg-red-500 rounded-2xl h-12 w-[80%] justify-center items-center'>
              <Text className='text-white text-lg' style={{ fontFamily: 'mulish-black' }}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}