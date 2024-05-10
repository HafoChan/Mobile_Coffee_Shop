import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCredential, setuserCredential] = useState('');
        const loginfire = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                Alert.alert('Alert Title', `Đăng nhap thành công ${email}`, [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => navigation.navigate("TabNavigator", { name: email }) },
                ]);
            })
            .catch((error) => {
                console.log(error)
            });
    }
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '743357854510-pep5d3lqj8bh8jkkd4c49boou1k32b0a.apps.googleusercontent.com',
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
            navigation.navigate("Welcome", { name: user.email })
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
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
            style={{ height: 40, borderWidth: 1 }}
            onChangeText={(email) => { setEmail(email) }}
            placeholder="Email"
        />
        <TextInput
            style={{ height: 40, borderWidth: 1 }}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            secureTextEntry={true}
        />
       
        <TouchableOpacity onPress={loginfire}>
            <Text style={{ backgroundColor: 'blue', fontSize: 25 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register", { name: 'dat' })}>
            <Text style={{ backgroundColor: 'red', fontSize: 25 }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoogleButtonPress}>
        <Text style={{fontSize:25}}>Login with google</Text>
</TouchableOpacity>

    </View>
);
}
