import React from 'react';
import { View, Text, Image } from 'react-native';

const Topic = ({ topic }) => {
  return (
    <View>
      {topic ? (
        <>
          {topic.imageUrl && (
            <Image
              source={{ uri: topic.imageUrl }}
              style={{ width: '100%', height: 200, marginTop: 10}}
              className='rounded-lg'
            />
          )}
           <Text className='text-2xl font-bold my-2 mx-4'>{topic.name}</Text>
        </>
      ) : (
        <Text>No topic available</Text>
      )}
    </View>
  );
};

export default Topic;
