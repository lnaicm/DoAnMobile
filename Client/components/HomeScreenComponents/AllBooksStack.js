import * as React from 'react';
import {

} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllBooks from './AllBooks';
import BookDetail from './BookDetail';

const Stack = createNativeStackNavigator();

function AllBooksStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="All Book Component"
                component={AllBooks}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Chi Tiet"
                component={BookDetail}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default AllBooksStack;