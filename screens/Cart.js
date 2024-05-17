import { Image, Text, TouchableOpacity, View, ScrollView, StyleSheet, Dimensions, TextInput } from "react-native"
import React, { useState, useEffect } from 'react';
import { icons, images } from "../constants"
import { CartItem } from "../components"
import { loadDataToCart } from "../getData";
const screenWidth = Dimensions.get('window').width

const Cartt = ({route, navigation}) => {
    console.log(route.params);
    console.log(route.params?.refreshCart);
    const [showTotal, setShowTotal] = useState(false);
    const [dataCart, setDataCart] = useState();

    const toggleTotal = () => {
        setShowTotal(!showTotal);
    };

    useEffect(() => {
        const getData = async () => {
            const dt = await loadDataToCart();
            setDataCart(dt);
        };
        if (route.params?.refreshCart) {
            getData();
            console.log("Load lại data nè");
        }
    }, [route.params?.refreshCart]); 
    
    const UiTotal = () => {
        return (
            <View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Subtotal</Text>
                    <Text style={styles.fontPrice}>$16</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Subtotal</Text>
                    <Text style={styles.fontPrice}>$16</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.fontPrice}>Subtotal</Text>
                    <Text style={styles.fontPrice}>$16</Text>
                </View>
                <View style={styles.boderBottom1}></View>
                <View style={styles.price}>
                    <Text style={styles.totalprice}>Total</Text>
                    <Text style={styles.totalprice}>$100</Text>
                </View>
                <TouchableOpacity style={styles.buttonCheckout}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        )
    }

    console.log("Chưa load lại data nhe")
    const showPrice = (item) => {
        const {size} = item
        if (size != undefined)
        {
            return {
                price : item.size[0].price,
                quantity : item.size[0].quantity
            }
        }
        else
        {
            return {
                price : item.price,
                quantity : item.quantity
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', marginTop: 10, marginBottom: 20, color: 'black' }}>Cart</Text>
            <View style={{ flex: 1, maxHeight: "70%" }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {dataCart && dataCart.map((item, index) => (
                        <CartItem
                            key={index}
                            name={item.name}
                            size={item.size}
                            imgUrl={item.imgUrl}
                            price={showPrice(item).price}
                            quantity = {showPrice(item).quantity}
                            id = {item.id}

                        />
                    ))}
                </ScrollView>

            </View>
            <View style={styles.ContainerCoupon}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>Coupon Code</Text>
                <View style={styles.buttonCoupon}>
                    <Image source={images.discount} style={{ height: 30, width: 30, marginLeft: 10, marginVertical: 5 }} />
                    <View style={{ width: screenWidth - 160 }}>
                        <TextInput placeholder="Input coupon" style={styles.fontPrice}>

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
        fontSize: 16,
        color: 'black'
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
    }
}
)
export default Cartt