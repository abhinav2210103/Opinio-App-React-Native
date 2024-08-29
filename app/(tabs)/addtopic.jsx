import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import File from '../../assets/images/file.svg';
import LoginButton from '../../assets/images/LoginButton';
import AppLoader from "../../components/AppLoader";


export default function Addtopic() {
  const [suggestionText, setSuggestionText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const addSuggestion = async () => {
    if (!suggestionText || !selectedImage) {
      ToastAndroid.show('Please fill in all fields and select an image.', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      let formData = new FormData();
      formData.append('suggestionText', suggestionText);
      formData.append('file', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'suggestion-image.jpg',
      });

      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/topic/suggestions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      ToastAndroid.show('Suggestion submitted successfully', ToastAndroid.SHORT);
      setSuggestionText('');
      setSelectedImage(null);
    } catch (err) {
      console.error('Error submitting suggestion:', err);
      ToastAndroid.show('Failed to submit suggestion', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['hsla(242, 47%, 13%, 1)', 'hsla(256, 31%, 23%, 1)']}
        className="flex-1"
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View className='flex items-center mt-16'>
          <Text className='text-4xl text-[#FFFFFF] mb-2 pt-5' style={{ fontFamily: 'baloo-semi' }}>
            What's on your mind? Share your idea for tomorrow's buzz!
          </Text>

          <View className='w-[80%] mt-5'>
            <Text className='text-base text-[#FFFFFF] mb-2 ml-2' style={{ fontFamily: 'nunito-bold' }}>
              Topic
            </Text>
            <View className='flex-row items-center border-2 border-white rounded-2xl h-14'>
              <TextInput
                value={suggestionText}
                onChangeText={setSuggestionText}
                className='flex-1 text-white px-3 text-xl'
                placeholder="Enter your suggestion"
                placeholderTextColor="#aaa"
              />
            </View>

            <TouchableOpacity onPress={handleImagePick} className='border-2 border-white rounded-2xl h-36 mt-10 flex justify-center items-center'>
              <File />
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <Image source={{ uri: selectedImage }} className="w-40 h-40 mt-5 rounded-xl" />
          )}

          <TouchableOpacity onPress={addSuggestion} className='flex justify-center items-center mt-10'> 
            <LoginButton />
            <Text className='absolute text-[#FFFFFF] text-lg ' style={{ fontFamily: 'mulish-black' }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
