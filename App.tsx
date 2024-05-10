import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './navigators/TabNavigator';
import Detail from './screens/Detail';


const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name='TabNavigator' component={TabNavigator} options={{animation: 'slide_from_bottom'}}/>
        <Stack.Screen name='Detail' component={Detail} options={{animation: 'slide_from_bottom'}}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default App

const styles = StyleSheet.create({})