import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ShopNavigator, { OrderNavigator } from './ShopNavigator'

const Drawer = createDrawerNavigator()

const ShopDrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Products" component={ShopNavigator}/>
            <Drawer.Screen name="Order" component={OrderNavigator}/>
        </Drawer.Navigator>
    )
}

export default ShopDrawerNavigator
