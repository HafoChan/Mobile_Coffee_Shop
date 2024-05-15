import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native"
import { images, icons, colors } from "../constants"
import { doc, setDoc, getDoc } from 'firebase/firestore';
import db from '../firebaseSetting';
import { useState, useEffect } from "react";
import { fetchData } from "../getData";
import { useNavigation } from "@react-navigation/native";
export {
    ItemCoffee_Other,
}
const heightItem = 240

const ItemCoffee_Other = (props) => {
    const [item,setItem] = useState()
    const { name, imgUrl, price, category, nameUser, id } = props
    const addCart = async () => {
        const cart = await fetchData(category, id)
        setItem(cart)
    }
    useEffect(() => {
        if (item != null) {
            pushCart();
        }
    }, [item]);
    const pushCart = async () => {
        console.log("inpush")
        const load = doc(db, "Users", `${nameUser}`);
        try {
            const userDocSnap = await getDoc(load);
            if (userDocSnap.exists()) {
                const existingUser = userDocSnap.data();
                const updatedCart = [...existingUser.cart];
                let itemFound = false;
    
                updatedCart.forEach(itemtest => {
                    if (itemtest.name === item.name) {
                        // Nếu tìm thấy một mục với cùng tên, tăng số lượng lên 1
                        console.log('vao')
                        if (itemtest.size ==undefined)
                            {
                                itemtest.quantity++
                            }
                            else
                            {
                            // Tìm kiếm kích thước "M" trong mảng size của sản phẩm và thiết lập thuộc tính "quantity" nếu tìm thấy
                            itemtest.size[0].quantity++;
    
                            }
                        itemFound = true;
                    }
                });
    
                // Nếu không tìm thấy mục với cùng tên, thêm item mới vào cart
                if (!itemFound) {
                    console.log("hihiii")
                    // Tạo một bản sao của item để tránh thay đổi trực tiếp dữ liệu ban đầu
                    const newItem = { ...item };
                    if (newItem.size ==undefined)
                        {
                            newItem.quantity = 1
                        }
                    else
                    {
                    // Tìm kiếm kích thước "M" trong mảng size của sản phẩm và thiết lập thuộc tính "quantity" nếu tìm thấy
                        const sizeM = newItem.size.find(size => size.sizeName === "M");
                        console.log(sizeM)
                        if (sizeM) {
                            sizeM.quantity = 1;
                        }
                    }
                    // Thêm mục sản phẩm đã được cập nhật vào giỏ hàng
                    updatedCart.push({ ...newItem});
                }
    
                const updatedUser = {
                    ...existingUser,
                    name: `${nameUser}`,
                    cart: item != null && updatedCart
                };
    
                setDoc(load, updatedUser)
                    .then(() => {
                        console.log("Document successfully updated!");
                    })
                    .catch((error) => {
                        console.error("Error updating document: ", error);
                    });
            }
            else {
                const dt = {
                    name: `${nameUser}`,
                    cart: []
                };
                console.log("----")
                console.log(item)
                // Kiểm tra xem item có tồn tại không
                if (item) {
                    console.log("hahaa")
                    // Tạo một bản sao của item để tránh thay đổi trực tiếp dữ liệu ban đầu
                    const newItem = { ...item };
                    if (newItem.size ==undefined)
                        {
                            newItem.quantity = 1
                        }
                    else
                    {
                    // Tìm kiếm kích thước "M" trong mảng size của sản phẩm và thiết lập thuộc tính "quantity" nếu tìm thấy
                    const sizeM = newItem.size.find(size => size.sizeName === "M");
                    console.log(sizeM)
                    if (sizeM) {
                        sizeM.quantity = 1;
                    }
                }
                    
                    // Thêm mục sản phẩm đã được cập nhật vào giỏ hàng
                    dt.cart.push(newItem);
                }
                
                // Lưu giỏ hàng vào cơ sở dữ liệu hoặc thực hiện các thao tác khác tùy theo nhu cầu của bạn
                setDoc(load, dt)
            }
        }
    
        catch (error) {
            console.error("Error getting user document:", error);
        }
    
    }
    const navigation = useNavigation()

    const pressItem = (category, id) => {
        navigation.navigate('Detail', { category: category, id: id })
    }
    return <TouchableOpacity style={stylesOtherItem.itemContainer} onPress={() => pressItem(category, id)}>
        <View style={stylesOtherItem.imageContainer}>
            <Image src={imgUrl} style={stylesOtherItem.image} />
        </View>
        <View style={stylesOtherItem.itemDetailContainer}>
            <Text style={styles.itemName} numberOfLines={1} ellipsize='tail'>{name}</Text>
            <View style={stylesOtherItem.favoriteAndPriceContainer}>
                <View>
                    <View style={stylesOtherItem.favoriteContainer}>
                        <Text style={styles.favoriteText}>200k</Text>
                        <Image source={icons.heart} style={[styles.favoriteIcon, { marginLeft: 5 }]} />
                    </View>
                    <Text style={styles.itemPrice}>{price.toLocaleString()}<Text> VNĐ</Text></Text>
                    <Text style={styles.itemPrice}>{price.toLocaleString()}<Text> VNĐ</Text></Text>
                </View>
                <TouchableOpacity onPress={(addCart)}>
                    <Image source={icons.addToCart} tintColor={colors.black} style={[styles.addIcon]} />
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