import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarIconStyle: styles.tabBarIcon,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8e8e93',
          tabBarLabelStyle: styles.tabBarLabel,
        }}>
        <Tabs.Screen
          name='home'
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name='history'
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => <MaterialIcons name="history" size={28} color={color} />,
          }}
        />
         <Tabs.Screen
          name='addtopic'
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) =><Feather name="plus-circle" size={26} color={color} />
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            tabBarLabel: '', 
            tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={28} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 55,
  },
  tabBarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    display: 'none',
  },
});
