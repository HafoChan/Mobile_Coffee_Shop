import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native"
import { colors, icons, images } from "../constants"
import { Header } from "../components";

const Detail = () => {
    return <View style={styles.container}>
        <Header/>
        <View style={styles.imageContainer}>
            <View style={{width: '80%', height: '95%', backgroundColor: colors.item, position: 'absolute', borderRadius: 800}}/>
            <Image source={images.item7} style={styles.image}/>
        </View>

        <View style={styles.detailsContainer}>
            <View style={{margin: 25}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Coffee Latte</Text>
                    <TouchableOpacity>
                        <Image source={icons.heart} style={styles.icon26}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingStars}>
                        {[...Array(5)].map((_, i) => (
                            <Image key={i} source={icons.star} style={styles.starIcon}/>
                        ))}
                        <Text style={styles.ratingText}>4.5</Text>
                    </View>
                </View>
                <Text style={styles.description}>Cà phê latte là một thức uống có nguồn gốc từ Ý bao gồm các nguyên liệu chính là cà phê và sữa được đánh lên, đồ uống này được tiêu thụ thường xuyên cả ở nhà và tại các quán cà phê, quán bar.</Text>
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>Số lượng</Text>
                    <TouchableOpacity>
                        <Image source={icons.minus} tintColor={'white'} style={styles.quantityButton}/>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>1</Text>
                    <TouchableOpacity>
                        <Image source={icons.plus} tintColor={'white'} style={styles.quantityButton}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                <Text style={styles.total}>$100</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.buttonChat, styles.button]}>
                    <Text style={styles.buttonText}>Nhắn tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonAdd, styles.button]}>
                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonBuy, styles.button]}>
                    <Text style={styles.buttonText}>Mua ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon26: {
        height: 26,
        width: 26,
    },
    icon28: {
        height: 28,
        width: 28,
    },
    imageContainer: {
        height: '42%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '80%',
        width: '60%',
    },
    detailsContainer: {
        height: '51%',
        backgroundColor: colors.secondary,
        justifyContent: 'space-between',
        borderRadius: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    ratingStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        height: 18,
        width: 18,
        marginEnd: 5,
    },
    ratingText: {
        fontSize: 15,
        color: 'black',
        marginStart: 5,
    },
    description: {
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '500',
        marginEnd: 20,
    },
    quantityButton: {
        padding: 5,
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: 'lightblue',
    },
    quantity: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginHorizontal: 15,
    },
    totalContainer: {
        marginHorizontal: 25,
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    total: {
        fontSize: 18,
        fontWeight: '500',
        color: 'red',
    },
    buttonContainer: {
        backgroundColor: 'lightblue',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonChat: {
        backgroundColor: 'green',
        width: '25%',
    },
    buttonAdd: {
        backgroundColor: 'green',
        width: '25%',
        fontSize: 12
    },
    buttonBuy: {
        backgroundColor: 'orange',
        width: '50%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});


export default Detail