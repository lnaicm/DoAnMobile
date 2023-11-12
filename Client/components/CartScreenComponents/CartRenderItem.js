import * as React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function CartRenderItem({item, screenWidth, handlers}) {
    const { book } = item;
    const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";
    const imageURL = baseURL + book.image;
    return (
        <View style={{ flex:1, flexDirection: "row", marginVertical: 10, width: screenWidth*0.935, backgroundColor: "white"}}>
            <Image source={{uri: imageURL}} style={{width: 100, height: 150, marginHorizontal: 10}} />
            <View style={{flex: 1, justifyContent: "space-evenly", marginHorizontal: 10}}>
                <Text style={{fontSize: 16}}> {book.name} </Text>
                <Text style={{fontSize: 18, color: "red"}}> {book.cost} x {item.quantity} </Text>
                <View style={{flex: 0, flexDirection: "row"}}>
                    <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-start"}}>
                        <TouchableOpacity
                            onPress={() => handlers.onDecreaseQuantity(book._id)}
                        >
                            <Text style={styles.quantityButton}> - </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 18, padding: 10}}> {item.quantity} </Text>
                        <TouchableOpacity
                            onPress={() => handlers.onIncreaseQuantity(book._id)}
                        >
                            <Text style={styles.quantityButton}> + </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", }}>
                        <TouchableOpacity
                            onPress={() => handlers.onRemoveFromCart(book._id)}
                        >
                            <AntDesign name="delete" size={24} color="red" style={{padding: 10, }}/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    quantityButton: {
        fontSize: 20,
        backgroundColor: "lightgray",
        padding: 10,
    }
})

export default CartRenderItem;