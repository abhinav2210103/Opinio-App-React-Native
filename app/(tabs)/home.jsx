import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import Blogs from '../../components/Blogs';
import Topic from '../../components/Topic';

export default function HomeScreen() {
  const [topic, setTopic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentTopic = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/topic/get`);
        setTopic(response.data);
        const blogsResponse = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/blog/all`);
        setBlogs(blogsResponse.data.blogs);
      } catch (err) {
        console.error('Error fetching current topic:', err);
        setError('Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentTopic();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='p-5'>
      <View className='mb-3'>
        <Text className='text-3xl font-bold'>Welcome</Text>
      </View>
      <Topic topic={topic} />
      <Blogs blogs={blogs} />
    </SafeAreaView>
  );
}