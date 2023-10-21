import * as React from 'react';
import {

} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookDetail from './BookDetail';
import SpecificGenre from './SpecificGenre';

const Stack = createNativeStackNavigator();

function SpecificGenreStack({route}) {
    const { data } = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Van Hoc Component"
                component={SpecificGenre}
                initialParams={{data: data}}
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

export default SpecificGenreStack;