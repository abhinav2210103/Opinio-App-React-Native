import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  BackHandler,
  ToastAndroid
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Likes from "../../assets/images/likes.svg";
import Comments from "../../assets/images/comments.svg";
import Edit from "../../assets/images/edit.svg";
import Privacy from "../../assets/images/privacy.svg";
import LoginButton from "../../assets/images/LoginButton";
import AppLoader from "../../components/AppLoader";

export default function Profile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({});
  const [step, setStep] = useState(0);
  const [newFullName, setNewFullName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = "";
    router.replace("/welcome");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/user/profile`
        );
        setUserProfile(response.data);
        setNewFullName(response.data.fullName);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("Error", "Failed to fetch user profile");
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (step === 1) {
        setStep(0);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [step]);

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      let apiCalled = false;
  
      if (newFullName !== userProfile.fullName) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/user/resetusername`,
          { newFullName }
        );
        if (response.status === 200) {
          setUserProfile((prev) => ({ ...prev, fullName: newFullName }));
          ToastAndroid.show("Username updated successfully", ToastAndroid.SHORT);
          apiCalled = true;
        }
      }
  
      if (newPassword) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/user/resetpassword`,
          { currentPassword, newPassword }
        );
        if (response.status === 200) {
          ToastAndroid.show("Password updated successfully", ToastAndroid.SHORT);
          apiCalled = true;
        }
      }
  
      if (!apiCalled) {
        ToastAndroid.show(
          "Please make changes to your profile before saving.",
          ToastAndroid.SHORT
        );
      }
  
      setStep(0);
    } catch (error) {
      console.error("Error saving changes:", error);
      ToastAndroid.show("Failed to save changes", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["hsla(242, 47%, 13%, 1)", "hsla(256, 31%, 23%, 1)"]}
        className="flex-1"
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View className="flex-1 justify-center items-center">
          {step === 0 ? (
            <>
              <Text>Profile</Text>
              <View className="w-[90%] flex flex-row gap-6  items-center justify-center">
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(153, 153, 153, 0.1)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl w-[45%]"
                >
                  <View className="h-36 justify-center items-center">
                    <Likes />
                    <View>
                      <Text
                        className="text-white text-lg mt-1"
                        style={{ fontFamily: "nunito-bold" }}
                      >
                        {userProfile.totalLikes}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className="text-[#50516D] mt-1 text-lg"
                        style={{ fontFamily: "nunito-bold" }}
                      >
                        Likes
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(153, 153, 153, 0.1)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl w-[45%]"
                >
                  <View className="h-36 justify-center items-center">
                    <View
                      style={{
                        backgroundColor: "rgba(186, 35, 150, 0.1)",
                        borderRadius: 32,
                      }}
                      className="p-3"
                    >
                      <Comments />
                    </View>
                    <View>
                      <Text
                        className="text-white text-lg mt-1"
                        style={{ fontFamily: "nunito-bold" }}
                      >
                        {userProfile.totalBlogs}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className="text-[#50516D] mt-1 text-lg"
                        style={{ fontFamily: "nunito-bold" }}
                      >
                        Comments
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View className="w-[90%] flex flex-row gap-6  items-center justify-center mt-1">
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(153, 153, 153, 0.1)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-xl w-[45%]"
                >
                  <TouchableOpacity
                    onPress={() => setStep(1)}
                    className="rounded-2xl h-36 justify-center items-center w-full"
                  >
                    <Edit />
                    <Text
                      className="text-[#3BC1F8]/50 text-lg mt-2"
                      style={{ fontFamily: "nunito" }}
                    >
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(153, 153, 153, 0.1)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-xl w-[45%]"
                >
                  <TouchableOpacity className="rounded-2xl h-36 justify-center items-center w-full">
                    <Privacy />
                    <Text
                      className="text-[#F34751]/50 text-lg mt-2"
                      style={{ fontFamily: "nunito" }}
                    >
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </>
          ) : (
            <View className="w-[80%]">
              <Text
                className="text-[#ffffff] text-4xl mb-10"
                style={{ fontFamily: "nunito-bold" }}
              >
                Edit Your Profile
              </Text>
              <Text
                className="text-[#ffffff] text-base mt-5 mb-1"
                style={{ fontFamily: "nunito-bold" }}
              >
                Edit Your Username
              </Text>

              <View className="flex-row items-center border-2 border-[#ffffff] rounded-2xl h-14">
                <TextInput
                  value={newFullName}
                  onChangeText={setNewFullName}
                  placeholder={userProfile.fullName || "Current Username"}
                  className="flex-1 text-white px-3 h-full text-xl"
                />
              </View>
              <Text
                className="text-[#ffffff] text-base mt-5 mb-1"
                style={{ fontFamily: "nunito-bold" }}
              >
                Current Password
              </Text>

              <View className="flex-row items-center border-2 border-[#ffffff] rounded-2xl h-14">
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  className="flex-1 text-white px-3 h-full text-xl"
                />
              </View>

              <Text
                className="text-[#ffffff] text-base mt-5 mb-1"
                style={{ fontFamily: "nunito-bold" }}
              >
                New Password
              </Text>

              <View className="flex-row items-center border-2 border-[#ffffff] rounded-2xl h-14">
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  className="flex-1 text-white px-3 h-full text-xl "
                />
              </View>
              <View className="relative flex justify-center items-center mt-10">
                <TouchableOpacity
                  onPress={handleSaveChanges}
                  className="flex justify-center items-center"
                >
                  <LoginButton />
                  <Text
                    className="absolute text-[#FFFFFF] text-lg"
                    style={{ fontFamily: "mulish-black" }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {step === 0 && (
            <TouchableOpacity
              onPress={handleLogout}
              className="mt-5 bg-red-500 rounded-2xl h-12 w-[80%] justify-center items-center"
            >
              <Text
                className="text-white text-lg"
                style={{ fontFamily: "mulish-black" }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
      {loading && <AppLoader />}
    </SafeAreaView>
  );
}
