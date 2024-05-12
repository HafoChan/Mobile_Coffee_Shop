import { StyleSheet, Image, Text, TouchableOpacity, View} from "react-native"
import { images, icons, colors } from "../constants"
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../firebaseSetting';
import { useState } from "react";
import { fetchData } from "../getData";
export {
    ItemCoffee_Other,
    ItemBlendedIce_Yogurt
}
const heightItem = 240

const ItemCoffee_Other = (props) => {
    const {name, imgUrl, price} = props
    return <TouchableOpacity style={stylesOtherItem.itemContainer}>
        <View style={stylesOtherItem.imageContainer}>
            <Image src={imgUrl} style={stylesOtherItem.image}/>
        </View>
        <View style={stylesOtherItem.itemDetailContainer}>
            <Text style={styles.itemName} numberOfLines={1} ellipsize='tail'>{name}</Text>
            <View style={stylesOtherItem.favoriteAndPriceContainer}>
                <View>
                    <View style={stylesOtherItem.favoriteContainer}>
                        <Text style={styles.favoriteText}>200k</Text>
                        <Image source={icons.heart} style={[styles.favoriteIcon, {marginLeft: 5}]}/>
                    </View>
                    <Text style={styles.itemPrice}>{price}</Text>
                </View>
                <TouchableOpacity>
                <Image source={icons.addToCart} tintColor={colors.black} style={[styles.addIcon]}/>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
}

const ItemBlendedIce_Yogurt = (props) => {
    return <TouchableOpacity style={stylesBlendedIce.item}>
        <View style={stylesBlendedIce.itemBackground}></View>
        <View style={stylesBlendedIce.itemContent}>
            <View style={stylesBlendedIce.favorite}>
                <Image source={icons.heart} style={styles.favoriteIcon}/>
                <Text style={styles.favoriteText}>400k</Text>
            </View>
            <Image source={images.item1} style={stylesBlendedIce.itemImage}/>
        </View>
        <View style={stylesBlendedIce.itemDetails}>
            <Text style={styles.itemName} numberOfLines={1} ellipsize='tail'>Trà xanh</Text>
            <View style={stylesBlendedIce.addContainer}>
                <Text style={styles.itemPrice}>$10</Text>
                <TouchableOpacity>
                    <Image source={icons.addToCart} tintColor={colors.black} style={styles.addIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
}

const stylesOtherItem = StyleSheet.create({
    itemContainer: {
        width: 160,
        height: heightItem,
        marginBottom: 15,
        backgroundColor: colors.item,

        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 4,
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '90%',
        width: '90%'
    },
    itemDetailContainer: {
        paddingHorizontal: 14
    },
    favoriteAndPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5
    },
    favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
})

const stylesBlendedIce = StyleSheet.create({
    item: {
        width: 160,
        height: heightItem,
        marginBottom: 10,
    },
    itemBackground: {
        position: 'absolute',
        width: '100%',
        height: '75%',
        backgroundColor: colors.item,
        borderRadius: 12,
        marginTop: heightItem - heightItem * 0.75,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 4,
    },
    itemContent: {
        flexDirection: 'row',
        width: '100%',
        height: '72%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    favorite: {
        flexDirection: 'row',
        width: '35%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: 8,
    },
    itemImage: {
        width: '60%',
        height: '110%',
    },
    itemDetails: {
        marginHorizontal: 14,
    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
})

const styles = StyleSheet.create({
    itemName: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 2,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
    },
    favoriteIcon: {
        height: 18,
        width: 18,
        marginRight: 5,
    },
    favoriteText: {
        fontSize: 15,
        fontWeight: '400',
        color: colors.black,
    },
    addIcon: {
        width: 30,
        height: 30
    }
})