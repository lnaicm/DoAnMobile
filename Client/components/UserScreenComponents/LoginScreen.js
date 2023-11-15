import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    Alert,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import validator from 'validator';

function LoginScreen({route}) {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { handlers } = route.params;

    const login = async (email, password) => {
        try {
            const isValidEmail = validator.isEmail(email);
            const isValidPassword = password.trim() !== "";
            if (!isValidEmail || !isValidPassword) {
                if (!isValidEmail) {
                    Alert.alert("Error", "Email không hợp lệ!");
                } else {
                    Alert.alert("Error", "Password không được để trống!");
                }
                return;
            }

            const response = await axios.post('http://139.180.134.207:3000/user/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const user = response.data;
                handlers.onLogin(user);
                console.log("LOGIN -> user: ", user);
                //navigation.navigate('User Info Screen');
            } else {
                Alert.alert('Login failed', response.data);
            }
        } catch (error) {
            //console.log(error.response.data);
            Alert.alert('Error', error.response.data);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text style={{fontSize: 32}}> Đăng nhập </Text>

            <Text style={styles.label}>Email </Text>
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
                    login(email, password);
                }}
            >
                <Text style={{fontSize: 20, color:"white"}}> Đăng Nhập </Text>
            </TouchableOpacity>
            <Text style={styles.label}> 
                Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Registration Screen")}
            >
                <Text style={{color: 'blue', fontSize: 20, textDecorationLine: "underline"}}>
                    Đăng Ký
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "75%",
        height: 32,
        fontSize: 20,
        borderWidth: 1,
        backgroundColor: "white",
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 18,
    }
});

export default LoginScreen;