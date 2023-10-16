
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
    const booksArray = Array.from(books);
    const vanHoc = booksArray.filter((book) => book.genres.includes("Văn Học"));
    const kinhTe = booksArray.filter((book) => book.genres.includes("Kinh Tế"));
    const tamLyKyNangSong = booksArray.filter((book) => book.genres.includes("Tâm Lý - Kỹ Năng Sống"));
    const tieuSuHoiKy = booksArray.filter((book) => {
        return ["Tiểu Sử", "Hồi Ký"].some((genre) => book.genres.includes(genre));
    });
    const lichSuDiaLyTonGiao = booksArray.filter((book) => {
        return ["Lịch Sử", "Địa Lý", "Tôn Giáo"].some((genre) => book.genres.includes(genre));
    });

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="All Books" component={AllBooks} />
            <Drawer.Screen name="Van Hoc" component={SpecificGenre} initialParams={{content: "Van Hoc"}} />
            <Drawer.Screen name="Kinh Te" component={SpecificGenre} initialParams={{content: "Kinh Te"}} />
            <Drawer.Screen name="Tam Ly - Ky Nang Song" component={SpecificGenre} initialParams={{content: "Tam Ly - Ky Nang Song"}} />
            <Drawer.Screen name="Tieu Su - Hoi Ky" component={SpecificGenre} initialParams={{content: "Tieu Su - Hoi Ky"}} />
            <Drawer.Screen name="Lich Su - Dia Ly - Ton Giao" component={SpecificGenre} initialParams={{content: "Lich Su - Dia Ly - Ton Giao"}} />
        </Drawer.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default HomeScreen;