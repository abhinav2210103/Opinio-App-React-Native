import React from 'react';
import { View, Text } from 'react-native';

const Blogs = ({ blogs }) => {
  return (
    <View className='mt-2 px-4'>
      <View className='flex justify-center items-center mb-2'>
      <Text className='text-xl text-[#ffffff]' style={{ fontFamily: 'nunito-bold' }}>Top Opinions</Text>
      </View>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <View key={blog._id} className='border-gray-300 py-2'>
            <View className='flex flex-row items-center gap-2'>
              <Text className='text-[#ffffff]' style={{ fontFamily: 'nunito-bold' }}> {blog.createdBy?.fullName || 'Anonymous'}</Text>
            </View>
            <View className='flex flex-row justify-between gap-2'>
            <Text className='w-[90%] text-[#ffffff] pl-1 pt-1' style={{ fontFamily: 'nunito'}}>{blog.thoughts}</Text>
            <View className='w-[10%]'>
            <Text className='font-bold '>{blog.likesCount}</Text>
            </View>
            </View>
           <Text className='text-[#AEACAC] pt-1 pl-1'>Reply</Text>
          </View>
        ))
      ) : (
        <Text>No comments available</Text>
      )}
    </View>
  );
};

export default Blogs;