import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import CategoryScreen from '../screen/CategoryScreen/CategoryScreen';

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    screenOptions={{
      "tabBarActiveTintColor": "#fff",
      "tabBarShowLabel": false,
      "tabBarItemStyle": {
        "backgroundColor": "#030841"
      },
      "tabBarStyle": [
        {
          "display": "flex"
        },
        null
      ]
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          //   tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={HomeScreen}
        options={{
          //   tabBarLabel: 'Upload',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="upload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
 
 initialParams={{
  number: 1
}}
      

        name="Category"
        component={CategoryScreen}
        
        // prop={{ id: 1 }}
        // initialParams={{ age: 45 }}
        options={{
          //   tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
            
          ),
        }}
      />
    </Tab.Navigator>
  );
}
