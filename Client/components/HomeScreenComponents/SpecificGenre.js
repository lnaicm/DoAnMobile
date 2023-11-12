
import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,

} from 'react-native';

import BookRenderItem from './BookRenderItem';

function SpecificGenre({route}) {
    const {width: screenWidth, height: sreenHeight} = Dimensions.get("window");
    const itemWidth = screenWidth * 0.4375;
    const { data } = route.params;
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center", }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                numColumns={2}
            />
        </SafeAreaView>
    )
};

export default SpecificGenre;