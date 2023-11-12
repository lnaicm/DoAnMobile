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
    const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";
    var imageName = "BachDaHanh.jpg";
    var imageSource = baseURL + imageName;
    console.log(imageSource);
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Image source={{uri: imageSource}} style={{width: 200, height: 200}}/>
            <Text> 
                Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Registration Screen")}
            >
                <Text>
                    Đăng Ký
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default LoginScreen;