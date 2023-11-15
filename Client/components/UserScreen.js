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
import PasswordChangeScreen from './UserScreenComponents/PasswordChangeScreen';
import UserController from './UserScreenComponents/UserController';

const Stack = createStackNavigator();

const UserScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const checkLoggedIn = async () => {
        try {
            const user = await UserController.getUser();
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
            await UserController.storeUser(user);
            setIsLoggedIn(true);
        },

        onLogout: async () => {
            await UserController.removeUser();
            setIsLoggedIn(false);
        }
    }

    return (
        <Stack.Navigator>
            { isLoggedIn ? (
                <>
                <Stack.Screen
                    name="User Info Screen"
                    component={UserInfoScreen}
                    options={{
                        title: "Thông Tin Tài Khoản",
                        headerShown: false
                    }}
                    initialParams={{handlers: handlers}}
                />
                <Stack.Screen
                    name="Password Change Screen"
                    component={PasswordChangeScreen}
                    options={{
                        title: "Đổi mật khẩu",
                        headerShown: false
                    }}
                    initialParams={{handlers: handlers}}
                />
                </>
            ) : (
                <>
                <Stack.Screen
                    name="Login Screen"
                    component={LoginScreen}
                    options={{
                        title: "Đăng Nhập",
                        headerShown: false
                    }}
                    initialParams={{handlers: handlers}}
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