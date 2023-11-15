import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';

import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CartScreen from './components/CartScreen';
import NotificationScreen from './components/NotifycationScreen';
import UserScreen from './components/UserScreen';
import BooksProvider from './components/BooksProvider';
import UserController from './components/UserScreenComponents/UserController';

const Tab = createBottomTabNavigator();

function App() {
  const [isInitialized, setInitialized] = React.useState(false);
  
  React.useEffect(() => {
    const checkAndRefreshToken = async () => {
      console.log("checkAndRefreshToken");
      try {
        const user = await UserController.getUser();
        console.log(user);
        if (user) {
          const response = await axios.post('http://192.168.1.145:3000/user/refreshAccessToken', {
            refreshToken: user.refreshToken,
          }, {
            headers: {
              accept: 'application/json',
              x_authorization: user.accessToken
            }
          });

          if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            // Assume you have a method in UserController to update the access token
            //await UserController.updateAccessToken(newAccessToken);
            console.log(newAccessToken);
            if (newAccessToken){
              user.accessToken = newAccessToken;
              await UserController.storeUser(user);
            }
          } else {
            console.error('Token refresh failed');
          }
        }
      } catch (error) {
        console.error('Error checkAndRefreshToken: ', error.response.data);
      }
    };

    checkAndRefreshToken();
    const refreshTokenInterval = setInterval(() => {
      checkAndRefreshToken();
    }, 9 * 60 * 1000); // 9 minutes interval

    // Clean up the interval on component unmount
    return () => clearInterval(refreshTokenInterval);
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
                  title: "Trang chủ",
                  tabBarIcon: ({focused}) => <Ionicons name="home-outline" size={24} color={focused ? "blue" : "gray"}/>,
                  tabBarActiveTintColor: "blue",
                  tabBarInactiveTintColor: "gray",
                }
              }
            />
            <Tab.Screen
              name={'Cart'}
              component={CartScreen}
              options={
                {
                  title: "Giỏ Hàng",
                  tabBarIcon: ({focused}) => <Ionicons name="cart-outline" size={24} color={focused ? "blue" : "gray"}/>,
                  tabBarActiveTintColor: "blue",
                  tabBarInactiveTintColor: "gray",
                }
              }
            />
            <Tab.Screen
              name={'User'}
              component={UserScreen}
              options={
                {
                  title: "Tài Khoản",
                  tabBarIcon: ({focused}) => <AntDesign name="user" size={24} color={focused ? "blue" : "gray"}/>,
                  tabBarActiveTintColor: "blue",
                  tabBarInactiveTintColor: "gray",
                }
              }
            />
            <Tab.Screen
              name={'Notification'}
              component={NotificationScreen}
              options={
                {
                  title: "Thông Báo",
                  tabBarIcon: ({focused}) => <Ionicons name="notifications-outline" size={24} color={focused ? "blue" : "gray"}/>,
                  tabBarActiveTintColor: "blue",
                  tabBarInactiveTintColor: "gray",
                }
              }
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