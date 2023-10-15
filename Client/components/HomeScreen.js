
import 'react-native-gesture-handler';
import * as React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,

} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import AllBooks from './HomeScreenComponents/AllBooks';
import SpecificGenre from './HomeScreenComponents/SpecificGenre';

import { UseBooksContext } from './BooksProvider';

const Drawer = createDrawerNavigator();

function HomeScreen() {
    const {books} = UseBooksContext();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="All Book" component={AllBooks} />
            <Drawer.Screen name="Van Hoc" component={SpecificGenre} initialParams={{content: "Van Hoc"}} />
            <Drawer.Screen name="Ngon Tinh" component={SpecificGenre} initialParams={{content: "Ngon Tinh"}} />
            <Drawer.Screen name="Lich Su - Dia Ly" component={SpecificGenre} initialParams={{content: "Lich Su - Dia Ly"}} />
        </Drawer.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default HomeScreen;