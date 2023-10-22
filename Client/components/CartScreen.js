import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,

} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import CartRenderItem from './CartScreenComponents/CartRenderItem';
import Cart from './CartScreenComponents/Cart';

function CartScreen() {
    const {width: screenWidth, height: screenHeight} = Dimensions.get("window");
    const [cartData, setCartData] = useState({ items: [] });
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const fetchData = async () => {
                const data = await Cart.getCart();
                setCartData(data);
            }
            fetchData();
        }
    }, [isFocused]);
    
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <FlatList
                data={cartData.items}
                keyExtractor={(item) => item.book.id}
                renderItem={({item}) => <CartRenderItem item={item} screenWidth={screenWidth} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CartScreen;
