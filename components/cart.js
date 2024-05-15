import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { colors,images ,icons} from '../constants';
const screenWidth = Dimensions.get('window').width
console.log(screenWidth)

const CartItem =(props)=>{
    const {name,size,imgUrl,price,quantity} = props
    // if (name1=='banh')
    //     {
    //     const {price} = props
    //     setPrice(price)
    //     }
    // else
    // {
    //     const {price} = {price:5}
    //     setPrice(price)
    // }
    return(
            <TouchableOpacity style={styles.contain}>
                <Image style={{width:100,height:"100%",borderRadius:20, marginRight:30}}source={{uri:imgUrl}}/>
                <View style={styles.text}>
                    <View style={styles.trash}> 
                        <Text style={{color:'orange',fontSize:16}}>{size!=undefined?"size"+size[0].sizeName:"Other"}</Text>
                         <TouchableOpacity>
                            <Image source={images.trash} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                    </View>
                <Text style={{fontSize:20,fontWeight:"bold",color:'black'}}>{name}</Text>
                    <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',width:screenWidth-180}}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'orange'}}>${price}</Text>
                        <View style={styles.button}>
                            <TouchableOpacity>
                                <Image source={icons.minus} tintColor={'black'} style={{width: 22, height: 22, borderRadius: 40, backgroundColor: 'white'}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 17, fontWeight: '500', color: 'black', marginHorizontal: 10}}>{quantity}</Text>
                            <TouchableOpacity>
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