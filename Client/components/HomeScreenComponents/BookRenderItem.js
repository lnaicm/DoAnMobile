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

const BookRenderItem = ({item, itemWidth}) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    
    return (
        <View style={{marginHorizontal: 10, alignItems:"center"}}>
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
                        <Image source={item.image} style={{width: itemWidth, height: itemWidth*1.5,}} />
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
                                <Text style={{fontSize: 16, color: "white",}}> Đóng </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{...styles.Button, backgroundColor: "green",}}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={{fontSize: 16, color: "white",}}> Chi Tiết </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
            onPress={() => setModalVisible(true)}
            >
                <Image source={item.image} style={{width:itemWidth, height: itemWidth*1.5}}/>
            </TouchableOpacity>
            <Text style={{width: "80%", textAlign: "center", fontWeight:"bold", }}> {item.name} </Text>
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
