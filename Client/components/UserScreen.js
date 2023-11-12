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
import UserController from './UserScreenComponents/UserController';

const Stack = createStackNavigator();

const UserScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const checkLoggedIn = async () => {
        try {
            const user = await UserController.getUserInfo();
            setIsLoggedIn(user !== null);
        }
        catch (error) {
            console.error("Error checkLoggedIn: ", error);
        }
    };
    React.useEffect(() => {
        checkLoggedIn();
    }, []);

    const handlers = {
        onLogin: async (user) => {
            await UserController.storeUserInfo(user);
            setIsLoggedIn(true);
        },

        onLogOut: async () => {
            await UserController.removeUserInfo();
            setIsLoggedIn(false);
        }
    }

    return (
        <Stack.Navigator>
            { isLoggedIn ? (
                <Stack.Screen
                    name="User Info"
                    component={UserInfoScreen}
                    options={{
                        title: "Thông Tin Tài Khoản",
                        headerShown: false
                    }}
                />
            ) : (
                <>
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
                </>
            )}
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default UserScreen;