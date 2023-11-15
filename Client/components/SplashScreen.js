import * as React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,

} from 'react-native';
import axios from 'axios';

import { UseBooksContext } from './BooksProvider';
//const BOOKS = require("../assets/BOOKS.json")

function SplashScreen({route}) {
    const {books, setBooks} = UseBooksContext();
    const getAllBooks = async () => {
        try {
            const respone = await axios.get('http://192.168.1.145:3000/book/all');
            const fetchedBooks = respone.data;
            setBooks( fetchedBooks);
        }
        catch (error) {
            console.error("Error fetching books: ", error.message);
        }
    }
    //setBooks(BOOKS);

    const {setInitialized} = route.params;

    React.useEffect(() => {
        getAllBooks()
        .then(() => setInitialized(true))
        .catch((error) => {
            console.error("Error fetching book: ", error);
        });
    }, []);

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