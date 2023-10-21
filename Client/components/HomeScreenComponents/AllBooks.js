import * as React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,

} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import BookRenderItem from './BookRenderItem';
import { UseBooksContext } from '../BooksProvider';
//import { UseHomeScreenContext } from '../HomeScreen';

function AllBooks() {
    // const { setHeaderShown } = UseHomeScreenContext();
    // const isFocus = useIsFocused();
    // React.useEffect(() => {
    //     if (isFocus) {
    //         setHeaderShown(true);
    //     };
    // }, [isFocus]);
    const { books } = UseBooksContext();
    const booksArray = Array.from(books);

    const tieuThuyet = booksArray.filter((book) => book.genres.includes("Tiểu Thuyết"));
    const truyenNgan = booksArray.filter((book) => book.genres.includes("Truyện Ngắn"));
    const lightNovel = booksArray.filter((book) => book.genres.includes("Light Novel"));
    const truyenTrinhTham = booksArray.filter((book) => book.genres.includes("Truyện Trinh Thám"));
    const kinhDien = booksArray.filter((book) => book.genres.includes("Kinh Điển"));
    const ngonTinh = booksArray.filter((book) => book.genres.includes("Ngôn Tình"));
    const phanTichKinhTe = booksArray.filter((book) => book.genres.includes("Phân Tích Kinh Tế"));
    const kyNangSong = booksArray.filter((book) => book.genres.includes("Kỹ Năng Sống"));
    const tamLy = booksArray.filter((book) => book.genres.includes("Tâm Lý"));
    const nhanCach = booksArray.filter((book) => book.genres.includes("Nhân Cách"));
    const tonGiao = booksArray.filter((book) => book.genres.includes("Tôn Giáo"));
    const huyenBiGiaTuongKinhDi = booksArray.filter((book) => {
        return ["Huyền Bí", "Giả Tưởng", "Kinh Dị"].some((genre) => book.genres.includes(genre));
    });
    const quanTriLanhDao = booksArray.filter((book) => {
        return ["Quản Trị", "Lãnh Đạo"].some((genre) => book.genres.includes(genre));
    });
    const nhanVatBaiHocKinhDoan = booksArray.filter((book) => {
        return ["Nhân Vật", "Bài Học Kinh Doanh"].some((genre) => book.genres.includes(genre));
    });
    const marketingBanHang = booksArray.filter((book) => {
        return ["Marketing", "Bán Hàng"].some((genre) => book.genres.includes(genre));
    });
    const khoiNghiepLamGiau = booksArray.filter((book) => {
        return ["Khởi Nghiệp", "Làm Giàu"].some((genre) => book.genres.includes(genre));
    });
    const taiChinhNganHang = booksArray.filter((book) => {
        return ["Tài Chính", "Ngân Hàng"].some((genre) => book.genres.includes(genre));
    });
    const lichSuDiaLy = booksArray.filter((book) => {
        return ["Lịch Sử", "Địa Lý"].some((genre) => book.genres.includes(genre));
    });
    const tieuSuHoiKy = booksArray.filter((book) => {
        return ["Tiểu Sử", "Hồi Ký"].some((genre) => book.genres.includes(genre));
    });
    
    const {width: screenWidth, height: sreenHeight} = Dimensions.get("window");
    const itemWidth = screenWidth * 0.5;

    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center",}}>
            <ScrollView>
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Tiểu Thuyết </Text>
                <FlatList
                    data={tieuThuyet}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Truyện Ngắn </Text>
                <FlatList
                    data={truyenNgan}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Light Novel </Text>
                <FlatList
                    data={lightNovel}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Truyện trinh Thám </Text>
                <FlatList
                    data={truyenTrinhTham}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Huyền Bí - Giả Tưởng - Kinh Dị </Text>
                <FlatList
                    data={huyenBiGiaTuongKinhDi}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Kinh Điển </Text>
                <FlatList
                    data={kinhDien}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Ngôn Tình </Text>
                <FlatList
                    data={ngonTinh}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Quản Trị - Lãnh Đạo </Text>
                <FlatList
                    data={quanTriLanhDao}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Nhân Vật - Bài Học Kinh Doanh </Text>
                <FlatList
                    data={nhanVatBaiHocKinhDoan}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Marketing - Bán Hàng </Text>
                <FlatList
                    data={marketingBanHang}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Khởi Ngiệp - Làm Giàu </Text>
                <FlatList
                    data={khoiNghiepLamGiau}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Phân Tích Kinh Tế </Text>
                <FlatList
                    data={phanTichKinhTe}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Tài Chính Ngân Hàng </Text>
                <FlatList
                    data={taiChinhNganHang}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Kỹ Năng Sống </Text>
                <FlatList
                    data={kyNangSong}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Tâm Lý </Text>
                <FlatList
                    data={tamLy}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Rèn Luyện Nhân Cách </Text>
                <FlatList
                    data={nhanCach}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Tiểu Sử - Hồi Ký </Text>
                <FlatList
                    data={tieuSuHoiKy}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Lịch Sử - Địa Lý </Text>
                <FlatList
                    data={lichSuDiaLy}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
                <Text style={{fontSize: 24, marginTop: itemWidth*0.125}}> Tôn Giáo </Text>
                <FlatList
                    data={tonGiao}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <BookRenderItem item={item} itemWidth={itemWidth} />}
                    horizontal={true}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "none",
    }
}) 

export default AllBooks;