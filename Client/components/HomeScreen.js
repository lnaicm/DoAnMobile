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
import AllBooksStack from './HomeScreenComponents/AllBooksStack';
import SpecificGenreStack from './HomeScreenComponents/SpecificGenreStack';

const Drawer = createDrawerNavigator();
const HomeScreenContext = React.createContext();

export function UseHomeScreenContext() {
    return React.useContext(HomeScreenContext);
}

function HomeScreen() {
    const [headerShown, setHeaderShown] = React.useState(true);
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
        <HomeScreenContext.Provider value={{headerShown, setHeaderShown}}>
        <Drawer.Navigator
            screenOptions={{
                swipeEnabled: 0,
            }}
        >
            <Drawer.Screen name="All Books" component={AllBooksStack} options={{headerShown: headerShown, title: "Tất Cả"}}/>
            <Drawer.Screen name="Van Hoc" component={SpecificGenreStack} initialParams={{data: vanHoc}} options={{title: "Văn Học"}}/>
            <Drawer.Screen name="Kinh Te" component={SpecificGenreStack} initialParams={{data: kinhTe}} options={{title: "Kinh Tế"}}/>
            <Drawer.Screen name="Tam Ly Ky Nang Song" component={SpecificGenreStack} initialParams={{data: tamLyKyNangSong}} options={{title: "Tâm Lý - Kỹ Năng Sống"}}/>
            <Drawer.Screen name="Tieu Su Hoi Ky" component={SpecificGenreStack} initialParams={{data: tieuSuHoiKy}} options={{title: "Tiểu Sử - Hồi Ký"}}/>
            <Drawer.Screen name="Lich Su Dia Ly Ton Giao" component={SpecificGenreStack} initialParams={{data: lichSuDiaLyTonGiao}} options={{title: "Lịch Sử - Địa Lý - Tôn Giáo"}}/>
        </Drawer.Navigator>
        </HomeScreenContext.Provider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default HomeScreen;