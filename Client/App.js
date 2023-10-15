import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CartScreen from './components/CartScreen';
import NotificationScreen from './components/NotifycationScreen';
import UserScreen from './components/UserScreen';

const Tab = createBottomTabNavigator();

function App() {
  const [isInitialized, setInitialized] = React.useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        { isInitialized ? (
          <>
          <Tab.Screen
            name={'Tab1'}
            component={HomeScreen}
          />
          <Tab.Screen
            name={'Tab2'}
            component={CartScreen}
          />
          <Tab.Screen
            name={'Tab3'}
            component={UserScreen}
          />
          <Tab.Screen
            name={'Tab4'}
            component={NotificationScreen}
          />
          </>
        ) : (
          <Tab.Screen
            name={"SplashScreen"}
            component={SplashScreen}
            options={
              {
                tabBarStyle: {
                  display: "none", 
                },
                headerShown: false,
              }
            }
            initialParams={{"setInitialized": setInitialized}}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;