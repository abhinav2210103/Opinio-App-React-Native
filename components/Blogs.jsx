import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import avatarImage from "../assets/images/avatar.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const Blogs = ({ blogs, likedBlogs: initialLikedBlogs }) => {
  const [likedBlogs, setLikedBlogs] = useState(initialLikedBlogs);
  const [blogLikes, setBlogLikes] = useState({});

  useEffect(() => {
    const initialLikesCountState = {};
    blogs.forEach((blog) => {
      initialLikesCountState[blog._id] = blog.likesCount;
    });
    setBlogLikes(initialLikesCountState);
  }, [blogs]);

  const handleLikePress = async (blogId) => {
    const isLiked = likedBlogs[blogId];
    const likesCount = blogLikes[blogId];

    setLikedBlogs((prev) => ({ ...prev, [blogId]: !isLiked }));
    setBlogLikes((prev) => ({
      ...prev,
      [blogId]: isLiked ? likesCount - 1 : likesCount + 1,
    }));

    try {
      if (isLiked) {
        await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/blog/unlike/${blogId}`,
          {},
          { withCredentials: true }
        );
      } else {
      
        await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/blog/like/${blogId}`,
          {},
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.error("Error liking/unliking blog:", error);
     
      setLikedBlogs((prev) => ({ ...prev, [blogId]: isLiked }));
      setBlogLikes((prev) => ({
        ...prev,
        [blogId]: isLiked ? likesCount : likesCount + 1,
      }));
    }
  };

  return (
    <View className="mt-2 px-2">
      <View className="flex justify-center items-center mb-2">
        <Text className="text-xl text-[#ffffff]" style={{ fontFamily: "nunito-bold" }}>
          Top Opinions
        </Text>
      </View>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <View key={blog._id} className="border-gray-300 py-2 flex flex-row items-center">
            <View className="w-[15%] mr-2">
              <Image
                source={avatarImage}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </View>
            <View className="w-[75%]">
              <Text className="text-[#ffffff]" style={{ fontFamily: "nunito-bold" }}>
                {blog.createdBy?.fullName || "Anonymous"}
              </Text>
              <Text className="text-[#ffffff] pl-1 pt-1" style={{ fontFamily: "nunito" }}>
                {blog.thoughts}
              </Text>
              <Text className="text-[#AEACAC] pt-1 pl-1">Reply</Text>
            </View>
            <View className="w-[10%] flex justify-center items-center">
              <TouchableOpacity onPress={() => handleLikePress(blog._id)}>
                <Ionicons
                  name={likedBlogs[blog._id] ? "heart-sharp" : "heart-outline"}
                  size={24}
                  color={likedBlogs[blog._id] ? "red" : "black"}
                />
              </TouchableOpacity>
              <View>
                <Text>{blogLikes[blog._id]}</Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text>No comments available</Text>
      )}
    </View>
  );
};

export default Blogs;
