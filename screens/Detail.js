import { StyleSheet, Image, Text, TouchableOpacity, View, ImageBackground, ScrollView } from "react-native";
import { colors, icons, images } from "../constants";
import { useState } from "react";
import { ExpandableText } from "../components";

const Detail = () => {

    const [size, setSize] = useState('M')
    const [quantity, setQuantity] = useState(1)
    const [favourite, setFavourite] = useState(false)

    const pressSize = (size) => {
        setSize(size)
    }

    const pressQuantity = (action) => {
        if (action === 'add')
            setQuantity(quantity + 1)
        else if (action === 'minus' && quantity > 0)
            setQuantity(quantity - 1)
    }

    const pressFavourite = () => {
        setFavourite(!favourite)
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.innerImageContainer}>
                    <View style={styles.overlayCircle}/>
                    <Image source={images.item6} style={styles.image} resizeMode="cover"/>
                </View>
                <TouchableOpacity style={styles.backButton}>
                    <Image source={icons.back} style={styles.backIcon} resizeMode="stretch"/>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.detailContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Coffee Latte</Text>
                        <TouchableOpacity onPress={() => pressFavourite()}>
                            <Image source={favourite ? icons.heart : icons.love} tintColor={colors.primary} style={styles.icon26}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>100.000<Text> VNĐ</Text></Text>
                    </View>
                    
                    <Text style={styles.sectionTitle}>Mô tả</Text>
                    <ExpandableText 
                        text="Trà xanh đá xay là thức uống được kết hợp giữa kem tươi béo ngậy, sữa ngọt ngào và lá trà xanh Nhật Bản. Matcha đá xay có vị chát nhẹ và hương thơm quyến rũ đặc trưng của lá trà xanh. Matcha có tác dụng tốt với thể chất và tinh thần, kích thích làm tỉnh táo và giảm căng thẳng."
                        maxLength={100}
                    />
                    
                    <View style={styles.selectionRow}>
                        <Text style={styles.selectionTitle}>Size</Text>
                        <Text style={styles.selectionTitle}>Số lượng</Text>
                    </View>
                    <View style={styles.selectionContainer}>
                        <View style={styles.sizeContainer}>
                            <TouchableOpacity onPress={() => {pressSize('M')}}>
                                <Image source={icons.sizeM} tintColor={size=='M' ? colors.third : 'rgb(120, 120, 120)'} style={styles.sizeIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {pressSize('L')}}>
                                <Image source={icons.sizeL} tintColor={size=='L' ? colors.third : 'rgb(120, 120, 120)'} style={styles.sizeIcon}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => pressQuantity('minus')} disabled={quantity > 0 ? false : true}>
                                <Image source={icons.minus} tintColor={colors.item} style={[styles.quantityButton, { backgroundColor: quantity > 0 ? colors.third : 'rgb(120, 120, 120)' }]}/>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity onPress={() => pressQuantity('add')}>
                                <Image source={icons.plus} tintColor={colors.item} style={styles.quantityButton}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Image source={icons.basket} style={styles.buttonIcon} tintColor={colors.secondary} resizeMode="stretch"/>
                            <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: '47%',
    },
    innerImageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayCircle: {
        width: '90%',
        height: '95%',
        backgroundColor: colors.backgroundDetail,
        position: 'absolute',
        borderRadius: 800,
    },
    image: {
        height: '80%',
        width: '60%',
    },
    backButton: {
        position: 'absolute',
        marginTop: 15,
        marginLeft: 15,
    },
    backIcon: {
        height: 30,
        width: 26,
    },
    detailsContainer: {
        height: '53%',
        backgroundColor: colors.item,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    detailContent: {
        margin: 25,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.primary,
    },
    icon26: {
        height: 28,
        width: 28,
        marginEnd: 5
    },
    priceContainer: {
        justifyContent: 'center',
        marginTop: 5,
        width: '40%',
    },
    priceText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgb(212,136,31)',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 5,
        color: colors.primary,
    },
    description: {
        fontSize: 17,
        fontWeight: '500',
    },
    selectionRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        width: '50%',
        color: colors.primary,
    },
    selectionContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
    },
    sizeContainer: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
    },
    sizeIcon: {
        width: 36,
        height: 36,
        marginRight: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 5,
        width: 24,
        height: 24,
        borderRadius: 3,
        backgroundColor: colors.third
    },
    quantity: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.black,
        marginHorizontal: 12,
    },
    buttonContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundDetail,
        width: '70%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    buttonIcon: {
        width: 24,
        height: 26,
        marginEnd: 10
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
        color: colors.secondary,
    },
});

export default Detail;