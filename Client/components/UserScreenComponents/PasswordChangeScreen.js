import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,

} from 'react-native';
import axios from 'axios';

import UserController from './UserController';

function PasswordChangeScreen ({route}) {
    const navigation = useNavigation();
    const { handlers } = route.params;
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [renewPassword, setRenewPassword] = React.useState("");
    
    const changePassword = async () => {
        try {
            const user = await UserController.getUser();
            
            if (!user) {
                console.error("User not found");
                return;
            }

            if (newPassword !== renewPassword) {
                Alert.alert("Error", "Mật khẩu nhập lại không khớp!");
                return;
            }

            // Make a request to change the password on the server
            const response = await axios.post(
                'http://139.180.134.207:3000/user/changePassword',
                {
                    email: user.user.email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
                {
                    headers: {
                        //Authorization: `Bearer ${user.accessToken}`
                        x_authorization: user.accessToken
                    }
                }
            );

            if (response.status === 200) {
                Alert.alert("Success", "Đổi mật khẩu thành công\nVui lòng đăng nhập lại", [
                    {
                        text: 'OK',
                        onPress: async () => {
                            try {
                                const response = await axios.post('http://139.180.134.207:3000/user/logout', {
                                    email: user.user.email
                                });
                                handlers.onLogout();
                            }
                            catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    },
                ]);
                
            } else {
                Alert.alert("Error", response.data || "Failed to change password");
            }
        } catch (error) {
            Alert.alert("Error", error.response.data);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 32}}> Đổi mật khẩu </Text>

            <Text style={styles.label}> Mật khẩu cũ </Text>
            <TextInput
                style={styles.input}
                onChangeText={setOldPassword}
            />

            <Text style={styles.label}> Mật khẩu mới </Text>
            <TextInput
                style={styles.input}
                onChangeText={setNewPassword}
            />

            <Text style={styles.label}> Nhập lại mật khẩu mới </Text>
            <TextInput
                style={styles.input}
                onChangeText={setRenewPassword}
            />

            <TouchableOpacity
                style={{
                    margin: 10,
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: 'red',
                    marginVertical: 20,
                }}
                onPress={() => {
                    changePassword();
                }}
            >
                <Text style={{fontSize: 20, color:"white"}}> Đổi mật khẩu </Text>
            </TouchableOpacity>

            {/* <Text style={styles.label}> 
                Bạn đã có tài khoản?
            </Text> */}
            <TouchableOpacity
                onPress={() => navigation.navigate("User Info Screen")}
            >
                <Text style={{color: 'blue', fontSize: 20, textDecorationLine:"underline"}}>
                    Trở về
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "75%",
        height: 32,
        borderWidth: 1,
        backgroundColor: "white",
        fontSize: 20,
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 18,
    }
});

export default PasswordChangeScreen;