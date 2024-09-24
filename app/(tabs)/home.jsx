import React, { useEffect, useState, useMemo } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import axios from "axios";
import Blogs from "../../components/Blogs";
import Topic from "../../components/Topic";
import AppLoader from "../../components/AppLoader";
import { LinearGradient } from "expo-linear-gradient";
import Line from "../../assets/images/line.svg";
import Logoinner from "../../assets/images/logoinner.svg";
import LogoOuter from "../../assets/images/logoouter.svg";
import io from "socket.io-client";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function HomeScreen() {
  const [topic, setTopic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [addingBlog, setAddingBlog] = useState(false);

  const socket = useMemo(() => io(BASE_URL, { withCredentials: true }), []);

  useEffect(() => {
    socket.on("newBlog", (newBlog) => {
      console.log("New blog received via socket:", newBlog);
      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    });

    socket.on("allBlogs", (allBlogs) => {
      console.log("All blogs received via socket:", allBlogs);
      setBlogs(allBlogs);
    });

    return () => {
      socket.off("newBlog");
      socket.off("allBlogs");
    };
  }, [socket]);

  useEffect(() => {
    const fetchCurrentTopicAndLikes = async () => {
      try {
        const topicResponse = await axios.get(`${BASE_URL}/topic/get`, {
          withCredentials: true,
        });
        setTopic(topicResponse.data);

        const blogsResponse = await axios.get(`${BASE_URL}/blog/all`, {
          withCredentials: true,
        });
        setBlogs(blogsResponse.data.blogs);

        const likesResponse = await axios.get(`${BASE_URL}/blog/likes`, {
          withCredentials: true,
        });
        const initialLikedState = {};
        likesResponse.data.likedBlogs.forEach((blog) => {
          initialLikedState[blog._id] = true;
        });
        setLikedBlogs(initialLikedState);
      } catch (err) {
        console.error("Error fetching data:", err.response ? err.response.data : err);
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
    setError(null); 
    try {
      const response = await axios.post(
        `${BASE_URL}/blog/addnew`,
        { thoughts: inputValue },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setBlogs([response.data.blog, ...blogs]);
        setInputValue("");
      }
    } catch (err) {
      console.error("Error adding blog:", err.response ? err.response.data : err);
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
        <TouchableOpacity onPress={() => setError(null)}>
          <Text className="text-blue-500 mt-4">Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={["hsla(242, 47%, 13%, 1)", "hsla(256, 31%, 23%, 1)"]}
          className="flex-1"
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <View className="mt-6">
            <View className="flex items-center justify-center flex-row gap-2 mt-2">
              <View className="relative w-12 h-12 flex items-center justify-center mt-2">
                <LogoOuter width={40} height={40} />
                <View className="absolute">
                  <Logoinner width={25} height={25} />
                </View>
              </View>
              <View>
                <Text className="text-3xl text-white" style={{ fontFamily: "nunito-bold" }}>
                  Today’s Topic
                </Text>
              </View>
            </View>
            <Topic topic={topic} />
            <View className="bg-[#2F2753] mx-1 flex rounded-3xl">
              <View className="h-6 w-[100%]" />
              <ScrollView>
                <View className="flex justify-center items-center">
                  <Line />
                </View>
                <Blogs blogs={blogs} likedBlogs={likedBlogs} />
              </ScrollView>
            </View>
          </View>

          <View className="absolute bottom-0 left-0 right-0 bg-[#2F2753] px-4 py-2 flex flex-row items-center">
            <TextInput
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
              placeholder="Share your thoughts..."
              placeholderTextColor="#aaa"
              className="flex-1 text-white bg-[#4B3A67] rounded-xl px-4 py-2"
              style={{ fontFamily: "nunito" }}
              editable={!addingBlog} 
            />
            <TouchableOpacity
              onPress={handleSubmitBlog}
              disabled={addingBlog} 
              className="ml-2 bg-[#6A51C9] rounded-xl px-4 py-2"
            >
              <Text className="text-white" style={{ fontFamily: "nunito-bold" }}>
                {addingBlog ? "Posting..." : "Post"}
              </Text>
              {addingBlog && <ActivityIndicator size="small" color="#FFF" />} 
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
