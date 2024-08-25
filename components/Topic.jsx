import React from 'react';
import { View, Text, Image } from 'react-native';

const Topic = ({ topic }) => {
  return (
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
  );
};

export default Topic;
