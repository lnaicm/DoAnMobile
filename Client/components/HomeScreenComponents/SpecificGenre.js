
import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,

} from 'react-native';

function SpecificGenre({route}) {
    console.log(route);
    const genre = route.params.content;
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center",}}>
            <Text style={{fontSize: 36,}}> {genre} </Text>
        </SafeAreaView>
    )
};

export default SpecificGenre;