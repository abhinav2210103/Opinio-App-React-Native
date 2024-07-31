import React from 'react';
import { View, Text } from 'react-native';

const Blogs = ({ blogs }) => {
  return (
    <View className='mt-5'>
      <Text className='text-xl font-bold'>Recent Blogs:</Text>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <View key={blog._id} className='border-b border-gray-300 p-2 mb-3'>
            <View className='flex flex-row gap-2'>
              <Text className='font-bold'>{blog.createdBy.fullName} -</Text>
              <Text className='text-gray-600 font-semibold'>{blog.thoughts}</Text>
            </View>
            <View className='flex flex-row justify-start gap-4'>
              <Text className='font-bold'>{blog.likesCount}</Text>
              <Text className='text-gray-600'>Add a Reply</Text>
              <Text className='text-gray-600'>View all Replies</Text>
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