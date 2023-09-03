import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//
import SplashScreen from '../screen/SplashScreen/SplashScreen';
import BottomNavigation from './BottomNavigation';
import FullScreen from '../screen/FullScreen/FullScreen';
import CategoryScreen from '../screen/CategoryScreen/CategoryScreen';
import CategoryScreen1 from '../screen/CategoryScreen/CategoryScreen1';



export default function index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplash ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : null}

        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="FullScreen"
          component={FullScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="CategoryScreen1"
          component={CategoryScreen1}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
