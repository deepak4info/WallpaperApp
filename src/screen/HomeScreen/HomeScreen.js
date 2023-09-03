import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import Axios from 'axios';

//
import SearchBar from './SearchBar/SearchBar';
// import HorizontalBar from './HorizontalBar/HorizontalBar';

export default function HomeScreen({ navigation }) {
  const [category, setCategory] = useState([]);

  // useEffect(async () => {
  //   const {data} = await Axios.get(
  //     'https://api.todayhalchal.in/api/getcategory',
  //   );

  //   setCategory(data);

  //   return () => {};
  // }, []);

  //

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

    // Cleanup function (if needed)
    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  //

  return (
    <View style={style.container} >
      <StatusBar backgroundColor={'#030318'} />
      <ScrollView >
        {/* <SearchBar /> */}
        {category.map((list, i) => {
          if (list.total_img > 0) {
            return (<TouchableOpacity
              key={i}
              onPress={() => navigation.navigate('CategoryScreen', { category: list.id })}
              style={{
                width: '45%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                height: 150,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                borderWidth: 1,
                borderColor: '#fff',
                marginVertical: 10,
              }}
            >
              <Text style={style.text}>{list.name}</Text>
            </TouchableOpacity>
            );
          }
        })}

        {category.length > 0 ? null : (
          <Text style={style.loading}>Loading...</Text>
        )}

        <View style={{ height: 30 }}></View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030318',
    flexDirection: 'column'
  },
  text: {
    color: '#fff',
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 15,
  },
  loading: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
});
