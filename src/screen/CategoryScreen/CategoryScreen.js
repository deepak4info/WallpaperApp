import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/HomeCard/HomeCard';

export default function CategoryScreen({ route }) {
  const [postData, setPostData] = useState([]);
  const url = 'https://api.todayhalchal.in/';
  const navigation = useNavigation();
  const  id  = route.params;
 const apiurl = 'https://api.todayhalchal.in/api/getdata?category_id=${id}&page_no=${1}'

useEffect(() => {
  async function fetchData() {
    try {
      const response = await Axios.get(
        `https://api.todayhalchal.in/api/getdata?category_id=${id.category}&page_no=${1}`
     
      );

      if (response.status === 200) {
        const data  = response.data;
        setPostData(data);
      } else {
       
      }
    } catch (error) {
     
    }
  }

  fetchData();
}, [id]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#030318'} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >

    {postData.map((list) => (
  <TouchableOpacity
    style={styles.item}
    key={list.id} // Use a unique identifier as the key
    onPress={() => {
      navigation.navigate('FullScreen', {
        url: url + list.path,
      });
    }}
  >
    <Card path={url + list.path} />
  </TouchableOpacity>
))}

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the background color to your preference
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    width: '50%',
    padding: 10,
  },
});