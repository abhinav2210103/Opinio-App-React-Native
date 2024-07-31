import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { EXPO_APP_BASE_URL } from '@env';

export default function HomeScreen() {
  const [topic, setTopic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentTopic = async () => {
      try {
        const response = await axios.get(`${EXPO_APP_BASE_URL}/topic/get`);
        setTopic(response.data);
        const blogsResponse = await axios.get(`${EXPO_APP_BASE_URL}/blog/all`);
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
      <View>
        <Text className='text-xl'>Hey, Today's Topic is:</Text>
        {topic ? (
          <>
            <Text className='text-2xl font-bold'>{topic.name}</Text>
            {topic.imageUrl && (
              <Image
                source={{ uri: topic.imageUrl }}
                style={{ width: '100%', height: 200, marginTop: 10, resizeMode: 'cover' }}
              />
            )}
          </>
        ) : (
          <Text>No topic available</Text>
        )}
      </View>
      <View className='mt-5'>
        <Text className='text-xl font-bold'>Recent Blogs:</Text>
        <ScrollView>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <View key={blog._id} className='border-b border-gray-300 p-2 mb-3'>
                <Text className='font-bold'>{blog.createdBy.fullName}</Text>
                <Text className='text-gray-600'>{blog.thoughts}</Text>
              </View>
            ))
          ) : (
            <Text>No comments available</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
