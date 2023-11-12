import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text> 
                Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Registration Screen")}
            >
                <Text style={{color: 'blue'}}>
                    Đăng Ký
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default LoginScreen;