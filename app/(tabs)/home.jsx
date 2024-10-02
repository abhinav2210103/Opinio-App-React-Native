import React, { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import Blogs from "../../components/Blogs";
import Topic from "../../components/Topic";
import AppLoader from "../../components/AppLoader";
import { LinearGradient } from "expo-linear-gradient";
import Line from "../../assets/images/line.svg";
import Logoinner from "../../assets/images/logoinner.svg";
import LogoOuter from "../../assets/images/logoouter.svg";
import io from 'socket.io-client';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const socket = io(BASE_URL, {
  withCredentials: true,
});

export default function HomeScreen() {
  const [topic, setTopic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [addingBlog, setAddingBlog] = useState(false);
  const lastPostedBlogId = useRef(null);  

  useEffect(() => {
    socket.on('newBlog', (newBlog) => {
      if (newBlog._id !== lastPostedBlogId.current) {
        setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
      }
    });

    socket.on('allBlogs', (allBlogs) => {
      setBlogs(allBlogs);
    });

    return () => {
      socket.off('newBlog');
      socket.off('allBlogs');
    };
  }, []);

  useEffect(() => {
    const fetchCurrentTopicAndLikes = async () => {
      try {
        const topicResponse = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/topic/get`,
          { withCredentials: true }
        );
        setTopic(topicResponse.data);
  
        const blogsResponse = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/blog/all`,
          { withCredentials: true }
        );
        const sortedBlogs = blogsResponse.data.blogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
  
        const likesResponse = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/blog/likes`,
          { withCredentials: true }
        );
        const initialLikedState = {};
        likesResponse.data.likedBlogs.forEach((blog) => {
          initialLikedState[blog._id] = true;
        });
        setLikedBlogs(initialLikedState);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentTopicAndLikes();
  }, []);
  
  const handleSubmitBlog = async () => {
    if (inputValue.trim() === "") return;
  
    setAddingBlog(true);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/blog/addnew`,
        { thoughts: inputValue },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        const newBlog = response.data.blog;
        lastPostedBlogId.current = newBlog._id;
  
        const updatedBlogs = [newBlog, ...blogs].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(updatedBlogs);
  
        setInputValue("");
      }
    } catch (err) {
      setError("Failed to add blog");
    } finally {
      setAddingBlog(false);
    }
  };

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
        <View className="mt-6"></View>
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
          <View className="bg-[#2F2753] mx-1 flex-1 rounded-t-3xl">
            <View className="h-6 w-full" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View className="flex justify-center items-center">
                <Line />
              </View>
              <Blogs blogs={blogs} likedBlogs={likedBlogs}/>
            </ScrollView>
          </View>

          <View className="bottom-0 left-0 right-0 bg-[#2F2753] px-4 py-2 flex flex-row items-center">
            <TextInput
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder="Share your thoughts..."
              placeholderTextColor="#aaa"
              className="flex-1 text-white bg-[#4B3A67] rounded-xl px-4 py-2"
              style={{ fontFamily: 'nunito' }}
              editable={!addingBlog}
            />
            <TouchableOpacity
              onPress={handleSubmitBlog}
              disabled={addingBlog}
              className="ml-2 bg-[#6A51C9] rounded-xl px-4 py-2"
            >
              <Text className="text-white" style={{ fontFamily: 'nunito-bold' }}>
                {addingBlog ? "Posting..." : "Post"}
              </Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
