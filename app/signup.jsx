import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EXPO_APP_BASE_URL } from '@env';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${EXPO_APP_BASE_URL}/user/signup`, {
        fullName,
        email,
        password
      })
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

        <TouchableOpacity onPress={() => router.push('/login')} style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue' }}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
