import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, ScrollView, FlatList } from "react-native"
import { icons, colors } from "../constants"
import {ItemBlendedIce_Yogurt, ItemCoffee_Other} from "../components"
import { useRoute } from '@react-navigation/native';
import { fetchData } from '../getData';

const Favourite = () => {

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

  const [mediumSize, largeSize] = size

  console.log(data)

  return (
    <View>
      <Text>Favourite</Text>
      <ItemCoffee_Other name={name} imgUrl={imgUrl} price={mediumSize.price}/>
    </View>
  )
}

export default Favourite

const styles = StyleSheet.create({})