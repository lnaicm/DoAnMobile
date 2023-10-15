import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,

} from 'react-native';

function AllBooks() {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center",}}>
            <Text style={{fontSize: 36,}}>All Books</Text>
        </SafeAreaView>
    )
};

export default AllBooks;