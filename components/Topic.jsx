import React from 'react';
import { View, Text, Image } from 'react-native';

const Topic = ({ topic }) => {
  return (
    <View>
      {topic ? (
        <>
          <View className='flex justify-center items-center'>
            {topic.imageUrl ? (
              <Image
                source={{ uri: topic.imageUrl }}
                style={{ width: '80%', height: 200, marginTop: 10 }}
                className='rounded-lg'
              />
            ) : (
              <View style={{ width: '80%', height: 200, marginTop: 10 }} className='rounded-lg bg-[#4B3A67]' />
            )}
          </View>
          
          <View className='flex justify-center items-center'>
            <Text className='text-3xl mt-2 text-[#ffffff]' style={{ fontFamily: 'baloo-semi' }}>
              {topic.name}
            </Text>
          </View>
        </>
      ) : (
        <Text>No topic available</Text>
      )}
    </View>
  );
};

export default Topic;
