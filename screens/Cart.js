import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native"
import { icons, images } from "../constants"

const Item = () => {
    return <View style={{height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', margin: 10, borderRadius: 10}}>
        <View style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Image source={images.item3} style={{marginHorizontal: 15, height: '90%', width: '30%'}}/>
            <View style={{width: '50%', marginEnd: 30}}>
                <Text style={{fontSize: 20, fontWeight: '500', color: 'black', marginBottom: 15}}>Coffee Latte</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontSize: 17, fontWeight: '500', color: 'red', marginRight: 30}}>$10</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity>
                            <Image source={icons.minus} tintColor={'black'} style={{width: 22, height: 22, borderRadius: 3, backgroundColor: 'lightblue'}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 17, fontWeight: '500', color: 'black', marginHorizontal: 10}}>1</Text>
                        <TouchableOpacity>
                            <Image source={icons.plus} tintColor={'black'} style={{width: 22, height: 22, borderRadius: 3, backgroundColor: 'lightblue'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
}

const Cart = () => {
    return <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <View style={{height: '8%', justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
            <Text style={{fontSize: 22, fontWeight: '600', color: 'black'}}>Giỏ hàng</Text>
        </View>

        <View showsVerticalScrollIndicator={false} style={{height: '60%'}}>
            <Item/>
            

        </View>

        <View style={{height: '12%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'grey', paddingHorizontal: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={{color: 'black', fontWeight: '400', fontSize: 16, marginBottom: 5}}>Total payment</Text>
                <Text style={{color: 'red', fontWeight: '500', fontSize: 18, marginRight: 10}}>$100</Text>
            </View>
            <TouchableOpacity style={{height: '50%', width: '60%', backgroundColor: 'lightblue', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Order</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default Cart