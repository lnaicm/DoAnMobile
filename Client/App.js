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
import BooksProvider from './components/BooksProvider';

const Tab = createBottomTabNavigator();

function App() {
  const [isInitialized, setInitialized] = React.useState(false);

  return (
    <BooksProvider>
      <NavigationContainer>
        <Tab.Navigator>
          { isInitialized ? (
            <>
            <Tab.Screen
              name={'Home'}
              component={HomeScreen}
              options={
                {
                  headerShown: false,
                }
              }
            />
            <Tab.Screen
              name={'Cart'}
              component={CartScreen}
            />
            <Tab.Screen
              name={'User'}
              component={UserScreen}
            />
            <Tab.Screen
              name={'Notification'}
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
    </BooksProvider>
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