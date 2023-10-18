import * as React from 'react';
import {
    SafeAreaView,
    View,
    Text,

} from 'react-native';

function BookDetail() {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center",}}>
            <Text style={{fontSize: 36}}> Book Detail </Text>
        </SafeAreaView>
    )
}

export default BookDetail;