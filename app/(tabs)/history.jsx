import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import AppLoader from "../../components/AppLoader";
import { LinearGradient } from 'expo-linear-gradient';

export default function History() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTopics = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/topic/all`, {
          withCredentials: true,
        });
        setTopics(response.data.topic);
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Failed to fetch topics');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTopics();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['hsla(242, 47%, 13%, 1)', 'hsla(256, 31%, 23%, 1)']}
        className="flex-1"
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <ScrollView className="p-6">
          {topics.map((topic) => (
            <View key={topic._id} className="bg-white rounded-lg p-4 mb-4 shadow">
              <Image source={{ uri: topic.imageUrl }} className="w-full h-48 rounded-lg mb-2" />
              <Text className="text-xl font-bold mb-1">{topic.TopicName}</Text>
              <Text className="text-sm text-gray-600">{new Date(topic.createdAt).toLocaleDateString()}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}