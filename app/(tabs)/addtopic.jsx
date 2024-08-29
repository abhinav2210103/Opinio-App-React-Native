import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Addtopic() {
  const [loading, setLoading] = useState(true);
    const addSuggestion = async () => {
      try {
        const response = await axios.post( `${process.env.EXPO_PUBLIC_BASE_URL}/topic/suggestions`, {
          withCredentials: true,
        });
      } catch (err) {
        console.error('Error fetching current topic:', err);
      } finally {
        setLoading(false);
      }
    }

  return (
    <View>
      <Text>addtopic</Text>
    </View>
  )
}

const styles = StyleSheet.create({})