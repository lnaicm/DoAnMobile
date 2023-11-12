import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RegistrationScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text> 
                Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Login Screen")}
            >
                <Text style={{color: 'blue'}}>
                    Đăng Nhập
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default RegistrationScreen;