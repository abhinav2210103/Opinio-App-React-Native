import React from 'react'
import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import { FontAwesome5,Ionicons,MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false
      }}>
        <Tabs.Screen
         name='home'
         options={{
            tabBarLabel:'Home',
            tabBarIcon:({color})=><FontAwesome5 name="home" size={24} color={color} />
         }}/>
        <Tabs.Screen name='profile'
        options={{
            tabBarLabel:'Profile',
            tabBarIcon:({color})=><Ionicons name="person-circle-outline" size={24} color={color} />
         }}
        />
        <Tabs.Screen name='history'
        options={{
            tabBarLabel:'Topic History',
            tabBarIcon:({color})=><MaterialIcons name="history" size={24} color="black" />
         }}/>
    </Tabs>
  )
}