import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import COLORS from '../constant/color'

const Stack = createStackNavigator()

function ShopNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: COLORS.primary}, headerTintColor: '#FFF'}}>
            <Stack.Screen name="ProductOverview" component={ProductsOverviewScreen}/>
        </Stack.Navigator>
    )
}

export default ShopNavigator
