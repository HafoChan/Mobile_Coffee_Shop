import { setDoc, where,query,doc, collection, getDoc, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity,Image } from 'react-native';
import { colors, icons } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Account({route}) {
  const [addressInput, setAddress] = useState('');
  const [phoneInput, setPhone] = useState('');
  const navigate = useNavigation()
  const handleUpdate = async ({navigation}) => {
    // Ở đây bạn có thể thực hiện việc gửi thông tin lên server hoặc xử lý khác
    Alert.alert('Đơn hàng đã được xử lý gửi tới!', `Address: ${addressInput}`);
    const user = doc(db,"User",`${route.params.name}`)
    const data ={
        name : route.params.name,
        address : addressInput,
        phone : phoneInput
    }
    await setDoc(user,data)
    navigate.goBack();
    console.log("update shipping success")
    
  };
 const back = () => {
        navigate.goBack();
    };
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin người dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={addressInput}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phoneInput}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Mua Hàng" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
