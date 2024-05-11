import React, { useState ,useEffect} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import { colors, icons, images } from "../constants"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = ({navigation}) => {

    const [selectedTab,setSelectedTab] = useState('signin');
    const changeTab = (tab) => {
        setSelectedTab(tab);}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCredential, setuserCredential] = useState('');
    const loginfire = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                navigation.navigate("TabNavigator",{name: email.split("@")[0]})
            })
            .catch((error) => {
                console.log(error)
            });
            
    }
    const handleRegister=()=>{
        navigation.navigate("Register", { email: email })
    }
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '767447950358-fjm7ksu2qmi04v7565ghue4g5f0un2m7.apps.googleusercontent.com',
        })
    },[])
    let isSigningIn = false;

    async function onGoogleButtonPress() {
        try {
            if (isSigningIn) {
                throw new Error('Sign-in process is already in progress');
            }
            isSigningIn = true;
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            
            // Get the user's ID token
            const { idToken,user } = await GoogleSignin.signIn();
            console.log(idToken)
            console.log(user)
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
            // Sign-in the user with the credential
            setuserCredential(await auth().signInWithCredential(googleCredential));
            navigation.navigate("TabNavigator", { name: user.email })
            isSigningIn = false;
            
            // Return the user credential
            return userCredential;
        } catch (error) {
            // Handle error
            console.error('Google sign-in error:', error);
            isSigningIn = false;

        }
    }


  return (
    <View style={styles.container}>
      <Image source={images.background} style={styles.image} />

      <View style={styles.form}>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:"20%"}}>
            <TouchableOpacity  style={selectedTab === 'signin' ? styles.activeTabButton : styles.unActiveTabButton}
                >
                <Text style={styles.title}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedTab === 'signup' ? styles.activeTabButton : styles.unActiveTabButton} 
            onPress={(handleRegister)}>
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

        <TouchableOpacity style={styles.button} onPress={loginfire}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
        </TouchableOpacity>
        <View style={styles.or}>
            <View style={{borderBottomWidth:2,width:125}}>

            </View>
            <Text style={styles.fontOr}>or</Text>
            <View style={{borderBottomWidth:2,width:125}}>
                
            </View>
        </View>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={(onGoogleButtonPress)}>
            <Image source={icons.gg} style={{height:50,width:100}} resizeMode='contain'/>
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

export default App;