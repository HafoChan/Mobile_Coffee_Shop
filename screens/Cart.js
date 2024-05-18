import { Image, Text, TouchableOpacity, View, ScrollView, StyleSheet, Dimensions, TextInput } from "react-native"
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { images } from "../constants"
import { CartItem } from "../components"
import { loadDataToCart } from "../getData"
import { changeCart} from "../components/cart"
import { updateQuantity } from "../updateQuantity"
import { setDoc, where,query,doc, collection, getDoc, getDocs,updateDoc,deleteField } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width

const Cartt = ({ route,navigation }) => {
    const [costTotal, setCostTotal] = useState(0)
    const [coupon, setCoupon] = useState()
    const [feeShip, setFeeShip] = useState(20000)
    const [showTotal, setShowTotal] = useState(false)
    const [dataCart, setDataCart] = useState([])

    const toggleTotal = () => {
        // updateQuantityFunction()
        console.log("tien hanh tinh toan")
        getData()
        setShowTotal(!showTotal)
    }
    useEffect(()=>{
        total()
    },[dataCart])
    
    const getData = async () => {
        console.log("cap nhat san pham + so luong")
        const dt = await loadDataToCart(route.params.name)
        setDataCart(dt)
    }

    useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
    )

    const calcuTotal=(a,b,c)=>{
        if (c == null)
            return a + b
        else if(a == 0)
            return 0
        else
            return a + b - ((a * c) / 100)
    }

    const updateQuantityFunction = () => {
        console.log("tang so luong")
        changeCart.forEach((item) => {
            updateQuantity(db, route.params.name, item, item.quantity, item.size)
        })
    }

    const toUpdate = async () => {
        const cityRef = doc(db, 'Users', `${route.params.name}`)
        await updateDoc(cityRef, {
            cart: deleteField()
        });
        const data = {
            cart : []
        }
        await setDoc(cityRef,data)
        
        navigation.navigate("account",{name:route.params.name})
    }

   const total =()=>{

        let totalCost = 0
        processCartData(dataCart).forEach((item) => {
            if (item.size == undefined) {
                totalCost += item.price * item.quantity
            } else {
                if (item.quantity > 0) {
                    totalCost += item.price * item.quantity
                } else if (item.quantity > 0) {
                    totalCost += item.price * item.quantity
                }
            }
        })
        setCostTotal(totalCost)
    }

    const processCartData = (dataCart) => {
        let processedCart = []
        dataCart.forEach(item => {
            if (item.size && Array.isArray(item.size)) {
                item.size.forEach(sizeObj => {
                    if (sizeObj.quantity > 0) {
                        processedCart.push({
                            ...item,
                            size: sizeObj.sizeName,
                            price: sizeObj.price,
                            quantity: sizeObj.quantity
                        })
                    }
                })
            } else if (item.quantity && item.quantity > 0) {
                processedCart.push(item)
            }
        })
        return processedCart
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
                    <Text style={styles.fontPrice}>{costTotal!=0?feeShip.toLocaleString():0}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Giảm giá</Text>
                    <Text style={styles.coupontext}>- {coupon ? coupon : 0}%</Text>
                </View>
                <View style={styles.boderBottom1}></View>
                <View style={styles.price}>
                    <Text style={styles.totalprice}>Tổng thanh toán</Text>
                    <Text style={styles.totalprice}>{costTotal!=0?calcuTotal(costTotal, feeShip, coupon).toLocaleString():0 }</Text>
                </View>
                <TouchableOpacity style={styles.buttonCheckout} onPress={(toUpdate)}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        )
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
                            key={`${item.id}-${item.size || 'default'}-${index}-${item.quantity}`}
                            name={item.name}
                            size={item.size}
                            imgUrl={item.imgUrl}
                            price={item.price}
                            quantity={item.quantity}
                            id={item.id}
                            item={item}
                            userName={route.params.name}
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
                    <TouchableOpacity style={styles.buttonSubmit} onPress={toggleTotal}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>{showTotal ? "Hủy" : "Xác nhận"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.total}>
                {showTotal && <UiTotal />}
            </View>
            <View style={{ flex: showTotal ? 0.3 : 0 }} />
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