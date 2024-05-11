import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, ScrollView, FlatList } from "react-native"
import { icons, colors } from "../constants"
import {ItemBlendedIce_Yogurt, ItemCoffee_Other} from "../components"
import { useRoute } from '@react-navigation/native';
import { fetchData } from '../getData';


const Category = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(fetchedData => {
            setData(fetchedData);
        }).catch(error => {
            console.error('Failed to fetch data:', error);
        });
    }, []);

    // Trước khi bóc tách, kiểm tra nếu dữ liệu có sẵn
    if (!data) {
        return <Text>Loading...</Text>; // Hoặc bất kỳ chỉ báo trạng thái tải nào khác
    }

    const { description, id, imgUrl, name, size } = data;

    console.log(data)
    
    const [mediumSize, largeSize] = size
    console.log(description)
    //console.log(size)
    const [coffeeItems, setCoffeeItems] = useState([
        { id: '1', icon: icons.hotCoffee, name: 'Cà phê nóng', active: false },
        { id: '2', icon: icons.iceCoffee, name: 'Cà phê đá', active: false },
        { id: '3', icon: icons.blendedIce, name: 'Đá xay - Yogurt', active: false },
        { id: '4', icon: icons.drink, name: 'Thức uống khác', active: false }
    ]);
    
    const [dessertItems, setDessertItems] = useState([
        { id: '1', icon: icons.dessert, name: 'Bánh ngọt', active: false },
        { id: '2', icon: icons.iceCream, name: 'Kem', active: false }
    ]);

    const route = useRoute();
    const [selectedTab, setSelectedTab] = useState('drinks');

    useEffect(() => {
        if (route.params?.selectedCategory && route.params?.id) {
            let updatedCoffeeItems
            let updatedDessertItems
            if (route.params.selectedCategory === 'drinks') {
                updatedCoffeeItems = coffeeItems.map(item => ({
                    ...item,
                    active: item.id === route.params.id
                }));

                updatedDessertItems = dessertItems.map(item => ({
                    ...item,
                    active: false
                }));
                
            } else if (route.params.selectedCategory === 'desserts') {
                updatedDessertItems = dessertItems.map(item => ({
                    ...item,
                    active: item.id === route.params.id
                }));
                
                updatedCoffeeItems = coffeeItems.map(item => ({
                    ...item,
                    active: false
                }));
            }
            setDessertItems(updatedDessertItems);
            setCoffeeItems(updatedCoffeeItems);
            setSelectedTab(route.params.selectedCategory);
        }
    }, [route.params?.selectedCategory, route.params?.id]);

    const pressCategory = (category, id) => {
        let updatedCoffeeItems;
        let updatedDessertItems;
        if (category === 'drinks') {
            updatedCoffeeItems = coffeeItems.map(item => ({
                ...item,
                active: item.id === id
            }));
            updatedDessertItems = dessertItems.map(item => ({
                ...item,
                active: false
            }));
            
        } else if (category === 'desserts') {
            updatedDessertItems = dessertItems.map(item => ({
                ...item,
                active: item.id === id
            }));
            updatedCoffeeItems = coffeeItems.map(item => ({
                ...item,
                active: false
            }));
            
        }
        setCoffeeItems(updatedCoffeeItems);
        setDessertItems(updatedDessertItems);
    }

    const Item = ({ category, id, icon, name, active }) => (
        <TouchableOpacity style={[styles.categoryItem, active && styles.activeCategoryItem]}
        onPress={() => pressCategory(category, id)}>
            <Image source={icon} tintColor={active && colors.item} style={styles.categoryIcon} />
            <Text style={[styles.categoryTitle, active && styles.activeCategoryTitle]}>{name}</Text>
        </TouchableOpacity>
    );

    const changeTab = (tab) => {
        setSelectedTab(tab);
    };

    return <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.titleHeader}>Menu</Text>
        </View>
    
        <View style={styles.tab}>
            <View style={styles.tabButton}>
                <TouchableOpacity
                    style={selectedTab === 'drinks' ? styles.activeTabButton : styles.unActiveTabButton}
                    onPress={() => changeTab('drinks')}
                >
                    <Text style={selectedTab === 'drinks' ? [styles.tabText, styles.activeTabText] : styles.tabText}>Thức uống</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={selectedTab === 'desserts' ? styles.activeTabButton : styles.unActiveTabButton}
                    onPress={() => changeTab('desserts')}
                >
                    <Text style={selectedTab === 'desserts' ? [styles.tabText, styles.activeTabText] : styles.tabText}>Tráng miệng</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.category}>
            <FlatList
                data={selectedTab=='drinks' ? coffeeItems : dessertItems}
                renderItem={({ item }) => <Item category={selectedTab} id={item.id} icon={item.icon} name={item.name} active={item.active}/>}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.itemContainer}>
            {data && ( // Render content only if data is available
            <>
                <ItemCoffee_Other name={name} imgUrl={imgUrl} price={mediumSize.price}/>
                <ItemCoffee_Other name={name} imgUrl={imgUrl} price={mediumSize.price}/>
                <ItemCoffee_Other name={name} imgUrl={imgUrl} price={mediumSize.price}/>
            </>
            )}
            {!data && ( // Display loading indicator or message if no data
                <Text>Đang tải...</Text>
            )}
            </View>
        </ScrollView>
    </View>
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        height: '6%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 22,
        fontWeight: '700',
        color: 'black',
        marginTop: 5
    },
    tab: {
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButton: {
        flexDirection: 'row',
        width: '65%',
        height: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    unActiveTabButton: {
        width: '48%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabButton: {
        width: '48%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: colors.primary
    },
    tabText: {
        fontSize: 17,
        fontWeight: '600',
    },
    activeTabText: {
        fontWeight: '600',
        color: colors.primary,
    },
    category: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    categoryItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginEnd: 10
    },
    activeCategoryItem: {
        backgroundColor: colors.primary,
    },
    categoryIcon: {
        height: 24,
        width: 24
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: 500,
        marginStart: 5
    },
    activeCategoryTitle: {
        color: colors.item
    },
    scrollView: {
        marginBottom: 15,
        paddingHorizontal: 15,
        marginBottom: 70
    },
    itemContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default Category