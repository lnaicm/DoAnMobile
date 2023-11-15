import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import UserController from './UserController';

function UserInfoScreen({route}) {
    const navigation = useNavigation();
    const { handlers } = route.params;
    const [user, setUser] = React.useState(null);
    const isFocused = useIsFocused();
    const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/userImage/"
    const imageURL = baseURL + "user.png";

    const getUser = async () => {
        try {
            const user = await UserController.getUser();
            setUser(user);
        }
        catch (error) {
            console.error("Error getUserInfo: ", error);
        }
    };

    React.useEffect(() => {
        if (isFocused) {
            getUser();
        }
    }, [isFocused])

    const logout = async (user) => {
        try {
            const response = await axios.post('http://139.180.134.207:3000/user/logout', {
                email: user.user.email
            });
            handlers.onLogout();
        }
        catch (error) {

        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", }}>
        {user ? (
            <>
                <Image source={{ uri: imageURL }} style={{ width: 150, height: 150 }} />
                <Text style={{ fontSize: 36 }}> {user.user.name} </Text>
                <Text style={{ fontSize: 20 }}> {user.user.email} </Text>
                <Text style={{ fontSize: 20 }}> Điểm tích lũy: {(parseInt(user.user.moneySpent) / 1000)} </Text>
                <View style={{flex: 0, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity
                        style={{
                            marginVertical: 50,
                            backgroundColor: 'red',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            navigation.navigate("Password Change Screen");
                        }}
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}> Đổi mật khẩu </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginVertical: 50,
                            backgroundColor: 'red',
                            padding: 10,
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            logout(user);
                        }}
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}> Đăng xuất </Text>
                    </TouchableOpacity>
                </View>
            </>
        ) : (
            <Text>Loading user information...</Text>
        )}
        </SafeAreaView>
    )
}

export default UserInfoScreen;