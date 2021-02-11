import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ShopNavigator, { OrderNavigator, UserNavigation } from './ShopNavigator'
import { Ionicons } from '@expo/vector-icons'

const Drawer = createDrawerNavigator()

const ShopDrawerNavigator = () => {
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
