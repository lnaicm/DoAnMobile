import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Modal,
    Alert,

} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import CartRenderItem from './CartScreenComponents/CartRenderItem';
import Cart from './CartScreenComponents/Cart';
import UserController from './UserScreenComponents/UserController';

function CartScreen() {
    const {width: screenWidth, height: screenHeight} = Dimensions.get("window");
    const [cartData, setCartData] = useState({ items: [] });
    const [totalCost, setTotalCost] = useState(0);
    const isFocused = useIsFocused();
    const [isModalVisible, setModalVisible] = useState(false);

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
        },

        onPurchase: () => {
            setModalVisible(true);
        },

        onConfirmPurchase: async () => {
            try {
                const user = await UserController.getUser();
                
                // if (!user) {
                //     console.error("User not found in AsyncStorage");
                //     return;
                // }

                const userEmail = user ? user.user.email : null;
                const purchaseAmount = totalCost;

                const response = await axios.post('http://192.168.1.145:3000/user/purchase', {
                    email: userEmail,
                    amount: purchaseAmount,
                });

                if (response.status === 200) {
                    if (user) {
                        const updatedUser = { ...user, user: { ...user.user, moneySpent: response.data.newMoneySpent } };
                        await UserController.storeUser(updatedUser);
                    }

                    setModalVisible(false);

                    Alert.alert("Success", `Thanh toán thành công\n${purchaseAmount} đ`);
                } else {
                    console.log('Failed to make the purchase');
                }
            } catch (error) {
                console.log('Error confirmingPurchase:', error.response.data);
                setModalVisible(false);
                Alert.alert("Error", error.response.data);
            }            
        },

        onCancelPurchase: () => {
            setModalVisible(false);
        }
    };

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
                    <TouchableOpacity
                        style={{
                        backgroundColor: "green",
                        padding: 10,
                        marginHorizontal: "10%",
                        borderRadius: 5,
                        }}
                        onPress={() => {
                            handlers.onPurchase();
                        }}

                    >
                        <Text style={{ fontSize: 20, textAlign: "center", color: "white", }} >
                            Thanh Toán
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                    <View style={{ backgroundColor: "white", padding: 30, borderRadius: 10, elevation: 5 }}>
                        <Text style={{ fontSize: 24, marginBottom: 10, textAlign: "center" }}>Xác nhận thanh toán</Text>
                        <Text style={{ fontSize: 20, }}>Bạn có chắc muốn thanh toán?</Text>
                        <Text style={{ fontSize: 32, color: "red", textAlign: "center" }}> {totalCost} đ </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                            <TouchableOpacity
                                style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "red", borderRadius: 5 }}
                                onPress={handlers.onCancelPurchase}
                            >
                                <Text style={{ color: "white", fontSize: 16, }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: "green", borderRadius: 5 }}
                                onPress={handlers.onConfirmPurchase}
                            >
                                <Text style={{ color: "white", fontSize: 16, }}>Đồng ý</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CartScreen;
