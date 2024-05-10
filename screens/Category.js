import React, { useState } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, ScrollView, FlatList } from "react-native"
import { icons, colors } from "../constants"
import {ItemBlendedIce_Yogurt, ItemCoffee_Other, Header} from "../components"


const Category = () => {

    const coffeeItems = [
        { id: '1', icon: icons.hotCoffee, name: 'Cà phê nóng', active: true },
        { id: '2', icon: icons.iceCoffee, name: 'Cà phê đá', active: true },
        { id: '3', icon: icons.blendedIce, name: 'Đá xay - Yogurt', active: true },
        { id: '4', icon: icons.drink, name: 'Thức uống khác', active: true }
    ];
    
    const dessertItems = [
        { id: '1', icon: icons.dessert, name: 'Bánh ngọt' },
        { id: '2', icon: icons.iceCream, name: 'Kem' }
    ];

    const [selectedTab, setSelectedTab] = useState('drinks');

    const Item = ({ icon, name, active }) => (
        <TouchableOpacity style={[styles.categoryItem, active && styles.activeCategoryItem]}>
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
                    style={selectedTab === 'desserts' ? styles.activeTabButton : styles.unActiveTabButton}
                    onPress={() => changeTab('desserts')}
                >
                    <Text style={selectedTab === 'desserts' ? [styles.tabText, styles.activeTabText] : styles.tabText}>Tráng miệng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={selectedTab === 'drinks' ? styles.activeTabButton : styles.unActiveTabButton}
                    onPress={() => changeTab('drinks')}
                >
                    <Text style={selectedTab === 'drinks' ? [styles.tabText, styles.activeTabText] : styles.tabText}>Thức uống</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.category}>
            <View style={styles.categoryContainer}>
                <FlatList
                    data={selectedTab=='drinks' ? coffeeItems : dessertItems}
                    renderItem={({ item }) => <Item icon={item.icon} name={item.name} active={item.active}/>}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.itemContainer}>
                <ItemBlendedIce_Yogurt/>
                <ItemCoffee_Other/>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25
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