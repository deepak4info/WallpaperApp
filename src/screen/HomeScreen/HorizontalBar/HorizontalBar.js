import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';
//

import Card from '../../../components/HomeCard/HomeCard';

export default function HorizontalBar({id}) {
  const [postData, setPostData] = useState([]);
  const url = 'https://api.todayhalchal.in/';

  //
  const navigation = useNavigation();

  useEffect( () => {

    async function fetch() {
      const {data} = await Axios.get(
        `https://api.todayhalchal.in/api/getdata?category_id=${id}&page_no=${1}`,
      );
  
      setPostData(data);
  
      return () => {};
    }
    fetch()
    
  }, []);
  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.container} horizontal={false} showsHorizontalScrollIndicator={false} >
        {postData.map((list, i) => {
          return (
            <TouchableOpacity style={style.item}
              key={i}
              onPress={() => {
                navigation.navigate('FullScreen', {
                  url: url + list.path,
                  
                });
              }}>
                {/* {console.log(url + list.path)} */}
              <Card path={url + list.path} />
    
            </TouchableOpacity>
          );
        })}
      </ScrollView>


        
      
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  item: {
    width: '50%',
    padding: 10 // is 50% of container width
  }
});  
