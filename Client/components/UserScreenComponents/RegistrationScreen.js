import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const validator = require("validator");

function RegistrationScreen() {
    const navigation = useNavigation();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const register = async (name, email, password) => {
        try {
            const isValidEmail = validator.isEmail(email);
            const isValidPassword = !(password.trim() === "");
            if (!isValidEmail || !isValidPassword) {
                if (!isValidEmail) {
                    Alert.alert("Email không hợp lệ!");
                }
                else {
                    Alert.alert("Password không được để trống!");
                }
                return;
            }

            const response = await axios.post('http://139.180.134.207:3000/user/register', {
                name: name, 
                email: email, 
                password: password, 
            });

            if (response.status === 200) {
                Alert.alert("Thành công", "Tạo tài khoản thành công. Chọn OK để đăng nhập", [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login Screen'),
                    },
                ]);
            } else {
                Alert.alert("Tạo tài khoản thất bại!");
            }
            } catch (error) {
            console.error('Error handling registration: ', error);
            Alert.alert('Error', error.response.data);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text style={{fontSize: 32}}> Tài khoản mới </Text>

            <Text style={styles.label}> Tên </Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
            />

            <Text style={styles.label}>Email (Dùng để đăng nhập) </Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={{
                    margin: 10,
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: 'royalblue',
                }}
                onPress={() => {
                    register(name, email, password);
                }}
            >
                <Text style={{fontSize: 20, color:"white"}}> Đăng Ký </Text>
            </TouchableOpacity>

            <Text style={styles.label}> 
                Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login Screen")}
            >
                <Text style={{color: 'blue', fontSize: 20, textDecorationLine:"underline"}}>
                    Đăng Nhập
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

export default RegistrationScreen;