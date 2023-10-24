import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
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
    const [totalCost, setTotalCost] = useState(0);
    const isFocused = useIsFocused();

    const fetchData = async () => {
        const data = await Cart.getCart();
        let newTotalCost = 0;
        data.items.forEach((item) => {
            newTotalCost += item.book.cost * item.quantity;
        });
        setTotalCost(newTotalCost);
        setCartData(data);
    }
    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const handlers = {
        onDecreaseQuantity: async (bookId) => {
            await Cart.decreaseQuantity(bookId);
            fetchData();
        },
        onIncreaseQuantity: async (bookId) => {
            await Cart.increaseQuantity(bookId);
            fetchData();
        },
        onRemoveFromCart: async (bookId) => {
            await Cart.removeFromCart(bookId);
            fetchData();
        }
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <FlatList
                data={cartData.items}
                keyExtractor={(item) => item.book.id}
                renderItem={({item}) => <CartRenderItem item={item} screenWidth={screenWidth} handlers={handlers}/>}
            />
            <View style={{borderWidth: 1, flex: 0, width: screenWidth, height: screenWidth*0.15}}>
                <View style={{flex: 1,}}>
                    <Text>
                        Thành Tiền:
                    </Text>
                    <Text>
                        {totalCost}
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CartScreen;
