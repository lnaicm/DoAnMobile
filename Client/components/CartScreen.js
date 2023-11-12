import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,

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
                keyExtractor={(item) => item.book._id}
                renderItem={({item}) => <CartRenderItem item={item} screenWidth={screenWidth} handlers={handlers}/>}
            />
            <View style={{flex: 0, flexDirection: "row", width: screenWidth, height: screenWidth*0.15}}>
                <View style={{flex: 1, }}>
                    <Text style={{fontSize: 16, marginTop: 5, marginLeft: 5}}>
                        Thành Tiền:
                    </Text>
                    <Text style={{fontSize: 24, color: "red", textAlign: "center"}}>
                        {totalCost} đ
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: "center", }}>
                    <TouchableOpacity style={{
                        backgroundColor: "green",
                        padding: 10,
                        marginHorizontal: "10%",
                        borderRadius: 5,
                    }}>
                        <Text style={{ fontSize: 20, textAlign: "center", color: "white", }} >
                            Thanh Toán
                        </Text>
                    </TouchableOpacity>
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
