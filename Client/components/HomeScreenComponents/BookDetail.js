import * as React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Alert,

} from 'react-native';

import Cart from '../CartScreenComponents/Cart';

function BookDetail({route}) {
    const {width: screenWidth, height: sreenHeight} = Dimensions.get("window");
    const itemWidth = screenWidth * 0.5;
    const { book } = route.params;
    return (
        <SafeAreaView>
            <ScrollView
                style={{}}
                contentContainerStyle={{justifyContent: "flex-start", alignItems: "center"}}
            >
                <Text style={{fontSize: 30, textAlign: "center", marginVertical: 15, width: "80%"}}> {book.name.toUpperCase()} </Text>
                <Image source={book.image} style={{width: screenWidth*0.75, height: screenWidth*1.125}}/>
                <View
                    style={{flex: 1, flexDirection: "row", width: "80%", justifyContent: "space-between", marginVertical: 15,}}
                >
                    <Text style={{color: "red", fontSize: 20, fontWeight: "bold"}}> {book.cost} đ </Text>
                    <TouchableOpacity
                        onPress={ async () => {
                            if (await Cart.addToCart(book)) {
                                Alert.alert("Đã thêm vào giỏ");
                            }
                            else {
                                Alert.alert("Thêm vào giỏ thất bại !!!");
                            }
                        }}
                    >
                        <Text style={{fontSize: 20, color: "blue", textDecorationLine: "underline"}}> Thêm Vào Giỏ </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: "row", alignSelf: "flex-start", marginLeft: itemWidth*0.125, marginVertical: 10}}>
                    <View style={{}}>
                        <Text style={styles.detailText}> Tác Giả: </Text>
                        {/* <Text style={styles.detailText}> Thể Loại:</Text> */}
                        <Text style={styles.detailText}> Năm XB: </Text>
                        <Text style={styles.detailText}> Trọng Lượng: </Text>
                        <Text style={styles.detailText}> Kích Thước: </Text>
                        <Text style={styles.detailText}> Số Trang: </Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.detailText}> {book.author} </Text>
                        {/* <Text style={styles.detailText}> {book.genres}</Text> */}
                        <Text style={styles.detailText}> {book.publishYear} </Text>
                        <Text style={styles.detailText}> {book.weight}g</Text>
                        <Text style={styles.detailText}> {book.size}cm </Text>
                        <Text style={styles.detailText}> {book.numPages} </Text>
                    </View>
                </View>
                <View style={{width: "90%"}}>
                    <Text style={{fontSize: 18}}> {"\n\t"+book.shortDescription} </Text>
                    <Text style={{fontSize: 18}}> {"\n\t"+book.longDescription} </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    detailText: {
        fontSize: 18,
        marginVertical: 4,
    }
})

export default BookDetail;