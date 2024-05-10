import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import auth from '@react-native-firebase/auth'
export default function register({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const register_firebase = () => {
    auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
        Alert.alert('Alert Title', `Đăng ký thành công ${email}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => navigation.navigate("TabNavigator",{name:email}) },
        ]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40,  borderWidth: 1 }}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style
 = {{height:40,borderWidth:1}} onChangeText={(password) => setPassword(password)} value={password} placeholder="password">
        </TextInput>
        <TextInput style = {{height:40,borderWidth:1}} placeholder="confirm password">
        </TextInput>
        <TouchableOpacity style ={{color:'blue'}} onPress={register_firebase}>
         <Text style={{backgroundColor:'red',fontSize:25}}> Register</Text>
        </TouchableOpacity>
        </View>
        
    )
}