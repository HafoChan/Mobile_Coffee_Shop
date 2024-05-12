import React, { useState } from "react";
import { colors, icons, images } from "../constants"
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
export default function Register({ navigation, route }) {
  const [selectedTab,setSelectedTab] = useState('signup');
  const [email, setEmail] = useState('');
  const [Confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const changeTab = (tab) => {
    setSelectedTab(tab);}
  const login_page =()=>{
    navigation.navigate("Login")

  }
  const register_firebase = () => {
    if(password==Confirm)
      {
    auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
        Alert.alert('Alert Title', `Đăng ký thành công ${email}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => navigation.navigate("Login") },
        ]);
      })
      .catch(function (error) {
        console.error(error);
      });
      
  }
  else
  { Alert.alert('Alert Title', `Password Wrong`, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => navigation.navigate("Register") },
  ]);}
  }

  return (
    <View style={styles.container}>
      <Image source={images.background} style={styles.image} />

      <View style={styles.form}>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:"20%"}}>
            <TouchableOpacity  style={selectedTab === 'signin' ? styles.activeTabButton : styles.unActiveTabButton}
                    onPress={(login_page)} >
                <Text style={styles.title}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedTab === 'signup' ? styles.activeTabButton : styles.unActiveTabButton} 
            onPress={()=>{}}>
                <Text style={styles.title}>Sign up</Text>
            </TouchableOpacity>
        </View>
        <View style ={styles.inputContainer}> 
            <Image source ={icons.email} style={styles.icon} resizeMode='contain'/>
            <TextInput
            style={styles.input}
            placeholder="Email Adress"
            onChangeText={(email) => { setEmail(email) }}            value={email}
            />
        </View>
        <View style ={styles.inputContainer}> 
        <Image source ={icons.pass} style={styles.icon} resizeMode='contain'/>

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}value={password}
        />
        </View>
        <View style ={styles.inputContainer}> 
        <Image source ={icons.pass} style={styles.icon} resizeMode='contain'/>

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
            onChangeText={(confirm)=>setConfirm(confirm)}  value={Confirm==password?password:Confirm}
        />
        </View>

        <TouchableOpacity style={styles.button} onPress={(register_firebase)}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B4513",
    alignItems: 'center',
  },
  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth: 2,
    borderColor: colors.primary,
    marginBottom:10,
  },
  fontOr:{

    fontSize:20,
    marginHorizontal:20
  },
  icon:{

    width:35,
    height:35
},
image: {
    flex:0.4,
    width: "100%",
    height: "100%",
  },
  form: {
    flex:0.6,
    marginTop: 20,
    width: 300,
  },
  or:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  unActiveTabButton: {
    width: '48%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
},
activeTabButton: {
    width: '48%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.primary,
},
  title: {
    color:'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    padding:10,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    fontSize : 20
  },
  button: {
    marginTop:20,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    alignSelf:'center',
    width:100
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignSelf:'center'

  },
  forgotPasswordText: {
    color: 'white',
  },
});
