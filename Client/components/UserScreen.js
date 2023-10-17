import * as React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,

} from 'react-native';

const UserScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent:"center", alignItems:"center",}}>
            <Text style={{fontSize: 36,}}>
                User
            </Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default UserScreen;