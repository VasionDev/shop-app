import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ShopNavigator, { OrderNavigator, UserNavigation } from './ShopNavigator'
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from '../screens/user/AuthScreen'
import COLORS from '../constant/color'
import { useSelector } from 'react-redux'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const defaultHeaderStyle = {
    headerStyle: {backgroundColor: COLORS.primary}, 
    headerTintColor: '#FFF'
}

const ShopDrawerNavigator = () => {

    const {token, userID} = useSelector(state=>state.auth)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        if(token !== null && userID !== null) {
            setIsLoggedIn(true)
        }
    }, [token, userID, setIsLoggedIn])

    if(!isLoggedIn) {
        return (
            <Stack.Navigator screenOptions={{...defaultHeaderStyle, headerStyle: {backgroundColor: COLORS.accent}}}>
                <Stack.Screen name="Auth" component={AuthScreen} options={{title: 'User Login'}} />
            </Stack.Navigator>
        )
    }

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Products" component={ShopNavigator} options={{
                drawerIcon: () => (
                    <Ionicons name="ios-home" size={24} color="black" />
                )
            }}/>
            <Drawer.Screen name="Order" component={OrderNavigator} options={{
                drawerIcon: () => (
                    <Ionicons name="ios-list" size={24} color="black" />
                )
            }}/>
            <Drawer.Screen name="Admin" component={UserNavigation} options={{
                drawerIcon: () => (
                    <Ionicons name="ios-options" size={24} color="black" />
                )
            }}/>
        </Drawer.Navigator>
    )
}

export default ShopDrawerNavigator
