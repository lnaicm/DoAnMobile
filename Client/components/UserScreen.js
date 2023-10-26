import * as React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,

} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import UserInfoScreen from './UserScreenComponents/UserInfoScreen';
import LoginScreen from './UserScreenComponents/LoginScreen';
import RegistrationScreen from './UserScreenComponents/RegistrationScreen';

const Stack = createStackNavigator();

const UserScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login Screen"
                component={LoginScreen}
                options={{
                    title: "Đăng Nhập",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Registration Screen"
                component={RegistrationScreen}
                options={{
                    title: "Đăng Ký",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="User Info"
                component={UserInfoScreen}
                options={{
                    title: "Thông Tin Tài Khoản",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default UserScreen;