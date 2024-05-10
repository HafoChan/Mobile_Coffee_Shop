import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { colors, icons, images } from "../constants"

const Home = () => {

    const coffeeItems = [
        { id: '1', icon: icons.hotCoffee, name: 'Cà phê nóng'},
        { id: '2', icon: icons.iceCoffee, name: 'Cà phê đá'},
        { id: '3', icon: icons.blendedIce, name: 'Đá xay - Yogurt'},
        { id: '4', icon: icons.drink, name: 'Thức uống khác'}
    ];
    
    const dessertItems = [
        { id: '1', icon: icons.dessert, name: 'Bánh ngọt' },
        { id: '2', icon: icons.iceCream, name: 'Kem' }
    ];

    const MenuItem = ({ icon, name }) => (
        <TouchableOpacity style={styles.item}>
            <Image source={icon} style={styles.itemIcon}/>
            <Text style={styles.itemText} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
        </TouchableOpacity>
    );

    return <View style={styles.containerAll}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Xin chào, <Text style={styles.boldText}>SoHan</Text></Text>
                <Image source={icons.user} style={styles.icon}/>
            </View>
            <View style={styles.bannerContainer}>
                <Image source={images.banner1} style={styles.banner}/>
            </View>

            <View style={{height: '12%', width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '500', marginStart: 15}}>Tìm ngay thức uống yêu thích của bạn!</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', borderRadius: 25, marginEnd: 10, marginTop: 10, backgroundColor: colors.secondary}}>
                    <Image source={icons.search} style={{height: 24, width: 24, marginStart: 20, marginEnd: 10}}/>
                    <TextInput placeholder="Tìm kiếm" style={{fontSize: 17}}/>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Thức uống</Text>
                <TouchableOpacity>
                    <Text style={styles.linkText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                {coffeeItems.map(item => <MenuItem key={item.id} icon={item.icon} name={item.name} />)}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tráng miệng</Text>
                <TouchableOpacity>
                    <Text style={styles.linkText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                {dessertItems.map(item => <MenuItem key={item.id} icon={item.icon} name={item.name} />)}
            </View>
        </View>

    </View>
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    header: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    headerText: {
        fontSize: 17,
        color: colors.darkgrey,
        fontWeight: '500'
    },
    boldText: {
        color: colors.black
    },
    icon: {
        height: 35,
        width: 35,
        borderRadius: 20
    },
    bannerContainer: {
        height: '25%',
        marginBottom: 20
    },
    banner: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        marginHorizontal: 5
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.black
    },
    linkText: {
        fontSize: 16,
        color: colors.primary
    },
    itemContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    item: {
        height: 50,
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.item,
        borderRadius: 25,
        marginBottom: 15,
    },
    itemIcon: {
        height: 26,
        width: 26,
        marginHorizontal: 10,
        marginStart: 15
    },
    itemText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.black
    },
})

export default Home