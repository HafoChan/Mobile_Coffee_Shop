import { Image, Text, TouchableOpacity, View, ScrollView, StyleSheet, Dimensions, TextInput } from "react-native"
import React, { useState, useEffect,useCallback} from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { icons, images } from "../constants"
import { CartItem } from "../components"
import { loadDataToCart } from "../getData";
import { changeCart,check } from "../components/cart";
import { pushCart } from "../pushCart";
import { updateQuantity } from "../updateQuantity";

const screenWidth = Dimensions.get('window').width

const Cartt = ({ route }) => {
    const [costTotal, setCostTotal] = useState(0);
    const [coupon, setCoupon] = useState();
    const [feeShip, setFeeShip] = useState(20000)
    const [showTotal, setShowTotal] = useState(false);
    const [dataCart, setDataCart] = useState([])

    const toggleTotal = () => {
        updateQuantityFunction()
        setShowTotal(!showTotal);
    };
    
    const getData = async () => {
        const dt = await loadDataToCart(route.params.name)
        setDataCart(dt)
    }

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    )

    const calcuTotal=(a,b,c)=>{
        if (c == null)
            return a+b
        return a + b - ((a * c) / 100)
    }

    const updateQuantityFunction = () => {
        changeCart.forEach((item) => {
            updateQuantity(db, route.params.name, item, item.quantity, item.size)
        })
    }

    const UiTotal = () => {
        return (
            <View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Tổng tiền hàng</Text>
                    <Text style={styles.fontPrice}>{costTotal.toLocaleString()}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Phí vận chuyển</Text>
                    <Text style={styles.fontPrice}>{feeShip.toLocaleString()}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Giảm giá</Text>
                    <Text style={styles.coupontext}>- {coupon?coupon:0}%</Text>
                </View>
                <View style={styles.boderBottom1}></View>
                <View style={styles.price}>
                    <Text style={styles.totalprice}>Tổng thanh toán</Text>
                    <Text style={styles.totalprice}>{ calcuTotal(costTotal, feeShip, coupon).toLocaleString() }</Text>
                </View>
                <TouchableOpacity style={styles.buttonCheckout}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    useEffect(() => {
        let totalCost = 0;
        processCartData(dataCart).forEach((item) => {
            if (item.size == undefined) {
                totalCost += item.price * item.quantity;
            } else {
                if (item.quantity > 0) {
                    totalCost += item.price * item.quantity;
                } else if (item.quantity > 0) {
                    totalCost += item.price * item.quantity;
                }
            }
        });
        setCostTotal(totalCost);
    }, [dataCart])

    // console.log("------------")
    // console.log(dataCart)
    // console.log("------------")
    
    const processCartData = (dataCart) => {
        // Tạo mảng mới để lưu trữ các mục đã xử lý
        let processedCart = [];

        // Duyệt qua từng mục trong dataCart
        dataCart.forEach(item => {
            if (item.size && Array.isArray(item.size)) {
                // Nếu mục có thuộc tính size, xử lý từng size
                item.size.forEach(sizeObj => {
                    if (sizeObj.quantity > 0) {
                        processedCart.push({
                            ...item,
                            size: sizeObj.sizeName,
                            price: sizeObj.price,
                            quantity: sizeObj.quantity
                        });
                    }
                });
            } else if (item.quantity && item.quantity > 0) {
                // Nếu mục không có thuộc tính size, thêm trực tiếp vào mảng mới
                processedCart.push(item);
            }
        });
        return processedCart;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Giỏ hàng</Text>
            </View>
            <View style={{ flex: 1, maxHeight: "70%" }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {dataCart && processCartData(dataCart).map((item, index) => (
                        <CartItem
                            key={`${item.id}-${item.size || 'default'}-${index}`}  // Sử dụng key duy nhất kết hợp id, size và index
                            name={item.name}
                            size={item.size}
                            imgUrl={item.imgUrl}
                            price={item.price}
                            quantity={item.quantity}
                            id={item.id}
                            item={item}
                            userName ={route.params.name}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.ContainerCoupon}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>Mã giảm giá</Text>
                <View style={styles.buttonCoupon}>
                    <Image source={images.discount} style={{ height: 30, width: 30, marginLeft: 10, marginVertical: 5 }} />
                    <View style={{ width: screenWidth - 160 }}>
                        <TextInput placeholder="Nhập mã giảm giá" onChangeText={(coupon) => setCoupon(coupon < 100 && coupon)} value={coupon} style={styles.fontPrice}>
                        </TextInput>
                    </View>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={(toggleTotal)}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>{showTotal ? "Hủy" : "Xác nhận"}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.total}>
                {showTotal && <UiTotal />}
            </View>
            <View style={{ flex: showTotal ? 0.3 : 0 }}/>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    header: {
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 22,
        fontWeight: '700',
        color: 'black',
        marginTop: 5,
        marginBottom: 10
    },
    ContainerCoupon: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    buttonCoupon: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        width: screenWidth - 40,
        borderRadius: 20,
        height: 40
    },
    buttonSubmit: {
        backgroundColor: '#8B0000',
        width: screenWidth - 312,
        borderRadius: 20,
        justifyContent: 'center'
    },
    price: {
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'space-between',
        marginVertical: 15,

    },
    total: {
        backgroundColor: 'lightgray',
        marginTop: 15,
        borderRadius: 20,
    },
    fontPrice: {
        fontSize: 18,
        color: 'black',
        fontWeight:'500'
    },
    boderBottom1: {
        borderBottomWidth: 1,
        width: "90%",
        marginHorizontal: 20
    },
    totalprice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonCheckout: {
        width: screenWidth - 40,
        backgroundColor: '#8B0000',
        borderRadius: 30,
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20
    },
    coupontext:{
        fontSize: 18,
        color: 'green'    }
}
)

export default Cartt