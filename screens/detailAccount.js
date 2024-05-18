import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { colors, icons, images } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Account({ route }) {
  const [addressInput, setAddress] = useState('');
  const [phoneInput, setPhone] = useState('');
  const navigate = useNavigation();

  const handleUpdate = async () => {
    Alert.alert('Đơn hàng đã được xử lý gửi tới!', `Address: ${addressInput}`);
    const user = doc(db, "User", `${route.params.name}`);
    const data = {
      name: route.params.name,
      address: addressInput,
      phone: phoneInput
    };
    await setDoc(user, data);
    navigate.goBack();
    console.log("update shipping success");
  };

  const back = () => {
    navigate.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={images.banner1} style={styles.logo} />
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
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Mua Hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  logo: {
    width: 350,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius:15
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
    fontSize : 17
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.white,
    fontSize: 18,
  },
});
