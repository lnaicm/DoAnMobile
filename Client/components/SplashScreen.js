import * as React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,

} from 'react-native';

import { UseBooksContext } from './BooksProvider';
import { BOOKS } from '../assets/BOOKS';

function SplashScreen({route}) {
    const {books, setBooks} = UseBooksContext();
    setBooks(BOOKS);

    const {setInitialized} = route.params;

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setInitialized(true);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [setInitialized]);

    return (
        <SafeAreaView style={{flex: 1, justifyContent:"center", alignItems:"center",}}>
            <Text style={{fontSize: 36,}}>
                Splash Screen
            </Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
})

export default SplashScreen;