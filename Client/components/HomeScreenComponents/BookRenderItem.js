import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal,
    StyleSheet,

} from 'react-native';

//import { UseHomeScreenContext } from '../HomeScreen';

const BookRenderItem = ({item, itemWidth}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    //const { setHeaderShown } = UseHomeScreenContext();
    const baseURL = "http://139.180.134.207/DoAnMobile/Client/assets/images/";
    const imageURL = baseURL + item.image;

    return (
        <View style={{width: itemWidth, margin: 10, alignItems:"center", }}>
            <Modal
                style={styles.modal}
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View 
                    style={styles.modalView}
                    //contentContainerStyle={{justifyContent: "center", alignItems: "center"}}
                >
                    <View style = {styles.modalItem}>
                        <Image source={{uri: imageURL}} style={{width: itemWidth*1.5, height: itemWidth*2.25,}} />
                        <Text style={{fontSize: 20, textAlign: "center",}}> {item.name} </Text>
                        {/* <View
                            style={{marginVertical: "5%", display: "flex", flexDirection:"row", justifyContent: "flex-end", width:"80%",}}
                        >
                        <Text style={{fontSize: 18, fontWeight:"bold",}}> Giá: </Text>
                        <Text style={{fontSize: 18, fontWeight:"bold", color: "red"}}> {item.cost} </Text>
                        </View> */}
                        <Text style={{fontSize: 16, marginTop:"5%"}}> {item.shortDescription} </Text>
                        <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly", }}>
                            <TouchableOpacity
                                style={{...styles.Button, backgroundColor: "red",}}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={{fontSize: 18, color: "white",}}> Đóng </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{...styles.Button, backgroundColor: "green",}}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    //setHeaderShown(false);
                                    navigation.navigate("Chi Tiet", {book: item});
                                }}
                            >
                                <Text style={{fontSize: 18, color: "white",}}> Chi Tiết </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
            onPress={() => setModalVisible(true)}
            >
                <Image source={{uri: imageURL}} style={{width:itemWidth, height: itemWidth*1.5}}/>
            </TouchableOpacity>
            <Text style={{fontSize: 16, width: "80%", textAlign: "center", }}> {item.name} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalItem: {
        display: 'flex',
        backgroundColor: 'white',
        padding: "8%",
        borderRadius: 10,
        alignItems: 'center',
    },
    Button: {
        borderColor: 'black',
        //borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
    }
  });

export default BookRenderItem;
