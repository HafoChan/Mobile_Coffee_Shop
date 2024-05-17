import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { images, icons } from '../constants';
import { deleteItemFromCart } from '../getData';
export const changeCart=[]

const screenWidth = Dimensions.get('window').width
const CartItem =(props)=>{
    const { id, name, size, imgUrl, price, quantity, item, userName } = props
    const [quantityvalue, setQuantity] = useState(quantity);

    useEffect(()=>{
        changeCart.slice(0,changeCart.length)
    },[userName])
    //console.log(item)

    useEffect(()=>{
        item.quantity = quantityvalue
        changeCart.push(item)
    },[quantityvalue])

    const PressButton = (name) => {
        if (name === "add")
        {
            setQuantity(quantityvalue + 1)
        }
        else if (name === "minus" && quantityvalue > 0)
        {
            setQuantity(quantityvalue - 1)
        }
    }

    const deleteItem = (name,size)=>{
        const b = {}
        const a = async(b) => {
            b = await deleteItemFromCart(name,size)
        }
        a(b) 
        console.log(b)
    }

    return(
        <TouchableOpacity style={styles.contain}>
            <View style={{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: "80%", height: "80%"}} src={imgUrl}/>
            </View>
            <View style={styles.text}>
                <View style={styles.trash}> 
                    <Text style={{color: 'orange', fontSize: 17, fontWeight: '400'}}>{size != undefined ? "Size : " + size: "Other"}</Text>
                        <TouchableOpacity onPress={() => deleteItem(userName,size)}>
                        <Image source={images.trash} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', width: screenWidth - 140}} numberOfLines={1} ellipsize='tail'>{name}</Text>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', width: screenWidth - 180}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'orange'}}>{price.toLocaleString()} VNĐ</Text>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => PressButton("minus")} disabled={quantity > 0 ? false : true}>
                            <Image source={icons.minus} tintColor={'black'} style={{width: 22, height: 22, backgroundColor: 'rgba(0,0,0,0)'}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 17, fontWeight: '500', color: 'black', marginHorizontal: 10}}>{quantityvalue}</Text>
                        <TouchableOpacity onPress={() => PressButton("add")}>
                            <Image source={icons.plus} tintColor={'black'} style={{width: 22, height: 22, backgroundColor: 'rgba(0,0,0,0)'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    contain:{
        height: 130,
        flexDirection: 'row',
        width: screenWidth - 40,
        marginHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    trash:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: screenWidth - 180,
        marginBottom: 10
    },
    text:{
        justifyContent: 'center',
        fontSize: 24,
        marginVertical: 14,
        justifyContent: 'space-between'
    },
    button:{
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        width: "45%"
    }
})

export default CartItem