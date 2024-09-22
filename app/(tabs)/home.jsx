import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";
import Blogs from "../../components/Blogs";
import Topic from "../../components/Topic";
import AppLoader from "../../components/AppLoader";
import { LinearGradient } from "expo-linear-gradient";
import Line from "../../assets/images/line.svg";
import Logoinner from "../../assets/images/logoinner.svg";
import LogoOuter from "../../assets/images/logoouter.svg";

export default function HomeScreen() {
  const [topic, setTopic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentTopic = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/topic/get`,
          {
            withCredentials: true,
          }
        );
        setTopic(response.data);
        const blogsResponse = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/blog/all`,
          {
            withCredentials: true,
          }
        );
        setBlogs(blogsResponse.data.blogs);
      } catch (err) {
        console.error("Error fetching current topic:", err);
        setError("Failed to fetch topic");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentTopic();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["hsla(242, 47%, 13%, 1)", "hsla(256, 31%, 23%, 1)"]}
        className="flex-1"
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View className='mt-6'>
          <View className="flex items-center justify-center flex-row gap-2 mt-2">
            <View className="relative w-12 h-12 flex items-center justify-center mt-2">
              <LogoOuter width={40} height={40} />
              <View className="absolute">
                <Logoinner width={25} height={25} />
              </View>
            </View>
            <View>
            <Text className="text-3xl text-white" style={{ fontFamily: 'nunito-bold' }}>
              Today’s Topic
            </Text>
            </View>
          </View>
          <Topic topic={topic} />
          <View className="bg-[#2F2753] mx-1 flex rounded-3xl">
            <View className='h-6 w-[100%]'></View>
          <ScrollView>
              <View className="flex justify-center items-center">
                <Line />
              </View>
              <Blogs blogs={blogs} />
          </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
