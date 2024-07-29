import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXPO_APP_BASE_URL } from '@env';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${process.env.EXPO_APP_BASE_URL}/user/signup`, {
        fullName,
        email,
        password
      });

      if (response.data.success) {
        Alert.alert('Success', 'User created successfully. Please verify your email.');
        router.push('/login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error', 'An error occurred during signup.');
    }
  };

  return (
    <SafeAreaView>
    <View>
      <Text>Full Name</Text>
      <TextInput value={fullName} onChangeText={setFullName} placeholder="Full Name" />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text>Already have an account?</Text>
      <Button title="Login" onPress={() => router.push('/login')} />
    </View>
    </SafeAreaView>
  );
}
