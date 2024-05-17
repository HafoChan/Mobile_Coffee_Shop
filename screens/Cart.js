import { Image, Text, TouchableOpacity, View, ScrollView, StyleSheet, Dimensions, TextInput } from "react-native"
import React, { useState, useEffect,useCallback} from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';

import { icons, images } from "../constants"
import { CartItem } from "../components"
import { loadDataToCart } from "../getData";
import { changeCart,check } from "../components/cart";
import { pushCart } from "../pushCart";
import { updateQuantity } from "../updateQuantity";
import { navi,getnavi } from "../const";

const screenWidth = Dimensions.get('window').width

const Cartt = ({ route }) => {
    const [costTotal, setCostTotal] = useState(0);
    const [coupon, setCoupon] = useState();
    const [feeShip, setFeeShip] = useState(20000);
    const [showTotal, setShowTotal] = useState(false);
    const toggleTotal = () => {
        updateQuantityFunction()
        setShowTotal(!showTotal);
    };
    const [dataCart, setDataCart] = useState([])
        const getData = async () => {
            const dt = await loadDataToCart(route.params.name)
            setDataCart(dt)
        }
        useFocusEffect(
            useCallback(() => {
                getData();
            }, [])
        );
    const calcuTotal=(a,b,c)=>{
        if (c==null)
            return a+b
        return a+b-((a*c)/100)
    }
    // const uniqueItems = Object.values(changeCart.reduce((acc, item) => {
    //     // Check if the item id is already in the accumulator
    //     if (item.size!=null)
    //         {
    //     if (!acc[item.name]) {
    //         // If not, add the item
    //         acc[item.id] = item;
    //     } else if (item.quantity > acc[item.id].quantity) 
    //         // If it is, keep the one with the highest quantity
    //          {
    //             acc[item.id] = item;
    //         }
    //     else if (item.size!=acc[item.id].size)
    //     {
    //         acc[item.id] = item;

    //     }
    //     else{
    //         acc[item.id] = item;

    //     }
        
    // }
    //     return acc;
    // }, {}));    
        const updateQuantityFunction=()=>{
            changeCart.forEach((item)=>{
                console.log("++++_____________")
                console.log(item)
                updateQuantity(db,route.params.name,item,item.quantity,item.size)
            })
        }

    
    const UiTotal = () => {
        return (
            <View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Subtotal</Text>
                    <Text style={styles.fontPrice}>{costTotal}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Fee Ship</Text>
                    <Text style={styles.fontPrice}>{feeShip}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Coupon</Text>
                    <Text style={styles.coupontext}>-{coupon?coupon:0}%</Text>
                </View>
                <View style={styles.boderBottom1}></View>
                <View style={styles.price}>
                    <Text style={styles.totalprice}>Total</Text>
                    <Text style={styles.totalprice}>{calcuTotal(costTotal,feeShip,coupon)}</Text>
                </View>
                <TouchableOpacity style={styles.buttonCheckout}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        )
    }
    useEffect(()=>{
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
    },[dataCart])
    
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
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', marginTop: 10, marginBottom: 20, color: 'black' }}>Cart</Text>
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>Coupon Code</Text>
                <View style={styles.buttonCoupon}>
                    <Image source={images.discount} style={{ height: 30, width: 30, marginLeft: 10, marginVertical: 5 }} />
                    <View style={{ width: screenWidth - 160 }}>
                        <TextInput placeholder="Input coupon" onChangeText={(coupon) => setCoupon(coupon<100&&coupon)} value={coupon} style={styles.fontPrice}>

                        </TextInput>
                    </View>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={(toggleTotal)}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>{showTotal ? "Cancel" : "Submit"}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.total}>
                {showTotal && <UiTotal />}
            </View>
            <View style={{ flex: showTotal ? 0.3 : 0 }}>

            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
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
        fontSize: 24,
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