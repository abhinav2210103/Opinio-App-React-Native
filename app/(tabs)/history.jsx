import React, { useState } from 'react'
import { View, Text,SafeAreaView } from 'react-native'

export default function history() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchAllTopics = async () => {
      try {
        const response = await axios.get( `${process.env.EXPO_PUBLIC_BASE_URL}/topic/all`, {
          withCredentials: true,
        });
        setTopics(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching current topic:', err);
        setError('Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };
    fetchAllTopics();
  }, []);

  return (
 <SafeAreaView>
    <View>
      <Text>histohujjnjnjnjnjnry</Text>
    </View>
    </SafeAreaView>
  )
}