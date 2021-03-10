import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import COLORS from '../constant/color'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import ShopHeaderButton from '../components/shop/ShopHeaderButton'
import OrderScreen from '../screens/shop/OrderScreen'
import CartScreen from '../screens/shop/CartScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import ProductEditScreen from '../screens/user/ProductEditScreen'

const Stack = createStackNavigator()

const defaultHeaderStyle = {
    headerStyle: {backgroundColor: COLORS.primary}, 
    headerTintColor: '#FFF'
}

export const HeaderDrawerMenu = ({navigation}) => {
    return (
        <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
            <Item title="menu" iconName="ios-menu" onPress={() => navigation.openDrawer()}/>
        </HeaderButtons>
    )
}

const ShopNavigator = ({navigation}) => {

    return (
        <Stack.Navigator screenOptions={defaultHeaderStyle}>
            <Stack.Screen name="ProductOverview" component={ProductsOverviewScreen} options={   {title: 'Product Overview', headerLeft: ()=>(
                    <HeaderDrawerMenu navigation={navigation}/>
            ), headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
                    <Item title="menu" iconName="ios-cart" onPress={() => navigation.navigate('Cart')}/>
                </HeaderButtons>
            )}
            }/>
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={({route})=>({title: route.params.productTitle}) } />
            <Stack.Screen name="Cart" component={CartScreen}/>
        </Stack.Navigator>
    )
}

export const OrderNavigator = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={defaultHeaderStyle}>
            <Stack.Screen name="OrderProducts" component={OrderScreen} options={
                {title: 'Order Detail', headerLeft: ()=>(
                    <HeaderDrawerMenu navigation={navigation}/>
                )}
            }/>
        </Stack.Navigator>
    )
}

export const UserNavigation = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={defaultHeaderStyle}>
            <Stack.Screen name="UserProducts" component={UserProductsScreen} options={
                {
                    title: 'User Products',
                    headerLeft: () => (
                        <HeaderDrawerMenu navigation={navigation}/>
                    ),
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
                            <Item title="create" iconName="ios-create" onPress={() => navigation.navigate('EditProduct')}/>
                        </HeaderButtons>
                    )
                }
            }/>
            <Stack.Screen name="EditProduct" component={ProductEditScreen} options={({route}) => (
                {title: route.params ? 'Edit Product' : 'Add Product', 
                    // headerRight: () => (
                    //     <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
                    //         <Item title="save" iconName="ios-checkmark" onPress={() => onProductAdded() }/>
                    //     </HeaderButtons>
                    // )
                }
            )}/>
        </Stack.Navigator>
    )
}


export default ShopNavigator
