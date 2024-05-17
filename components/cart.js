import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { colors,images ,icons} from '../constants';
import { loadQuantity } from '../getData';
import { collection,query,where,setDoc,and,getDocs } from 'firebase/firestore';
import { deleteItemFromCart } from '../getData';
const screenWidth = Dimensions.get('window').width
console.log(screenWidth)
export const changeCart=[]
const CartItem =(props)=>{
    const {id,name,size,imgUrl,price,quantity,item,userName} = props
    const [quantityvalue,setQuantity] = useState(quantity);
    useEffect(()=>{
        console.log("-------------")
        changeCart.slice(0,changeCart.length)
        console.log(changeCart)
    },[userName])
    useEffect(()=>{
        console.log("+++++++++++++")
        console.log(quantityvalue)
        item.quantity = quantityvalue
        changeCart.push(item)
    },[quantityvalue])
    const PressButton=(name)=>{
        if (name==="add")
        {
            setQuantity(quantityvalue+1)
        }
        else if (name==="minus" && quantityvalue>0)
        {
            setQuantity(quantityvalue-1)
        }
console.log("{}}")
console.log(changeCart)

    }
    const deleteItem = (name,size)=>{
        const b ={}
        const a =async(b)=>{
             b = await deleteItemFromCart(name,size)
            
        }
        a(b) 
        console.log(b)
}

    return(
            <TouchableOpacity style={styles.contain}>
                <Image style={{width:100,height:"100%",borderRadius:20, marginRight:30}}source={{uri:imgUrl}}/>
                <View style={styles.text}>
                    <View style={styles.trash}> 
                        <Text style={{color:'orange',fontSize:17}}>{size!=undefined?"size : "+size:"Other"}</Text>
                         <TouchableOpacity onPress={()=>deleteItem(userName,size)}>
                            <Image source={images.trash} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                    </View>
                <Text style={{fontSize:20,fontWeight:"bold",color:'black',width:screenWidth-140}}>{name}</Text>
                    <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',width:screenWidth-180}}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'orange'}}>${price}</Text>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=>PressButton("minus")} disabled={quantity>0?false:true}>
                                <Image source={icons.minus} tintColor={'black'} style={{width: 22, height: 22, borderRadius: 40, backgroundColor: 'white'}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 17, fontWeight: '500', color: 'black', marginHorizontal: 10}}>{quantityvalue}</Text>
                            <TouchableOpacity onPress={()=>PressButton("add")}>
                                <Image source={icons.plus} tintColor={'black'} style={{width: 22, height: 22, borderRadius: 40, backgroundColor: 'white'}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    contain:{
        height:140,
        flexDirection:'row',
        width: screenWidth-40,
        marginHorizontal: 20,
        borderRadius:20,
        backgroundColor:'white',
        marginBottom:20,
    },
    trash:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:screenWidth-180,
        marginBottom:10
    },
    text:{
        justifyContent:'center',
        fontSize:24,
        marginTop:10,
        marginBottom:10,
        justifyContent:'space-between'
    },
    button:{
        marginBottom:5,
        flexDirection:'row',
        borderRadius:40,
        borderWidth:1,
        width:"38%"

    }
})

export default CartItem