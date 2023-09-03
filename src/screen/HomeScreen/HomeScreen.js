import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import Axios from 'axios';

// Import your custom components here (SearchBar, HorizontalBar)

export default function HomeScreen({ navigation }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get(
          'https://api.todayhalchal.in/api/getcategory'
        );
        setCategory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#030318'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Include your custom SearchBar component here */}
    

        {category.map((list, i) => {
          if (list.total_img > 0) {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate('CategoryScreen', { category: list.id })}
              >
                <Text style={styles.categoryText}>{list.name}</Text>
              </TouchableOpacity>
            );
          }
        })}

        {category.length === 0 && (
          <Text style={styles.loadingText}>Loading...</Text>
        )}

        <View style={styles.space}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030318',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 15,
  },
  loadingText: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
  space: {
    height: 30,
  },
});
