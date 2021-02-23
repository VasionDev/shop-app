import React, { useState } from 'react'
import { FlatList, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import COLORS from '../../constant/color'
import { deleteProduct } from '../../store/actions/product'

const UserProductsScreen = ({navigation}) => {

    const userProducts = useSelector(state=> state.products.userProducts)
    const dispatch = useDispatch()

    const onDeleteProduct = (id) => {
        Alert.alert('Product Delete', 'Are you sure to delete this product?', [
            {
                text: "Cancel",
                style: 'cancel'
            },
            {
                text: "Delete",
                onPress: () => {dispatch(deleteProduct(id))},
                style: 'destructive'
            }
        ])
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item=>item.id}
            renderItem={itemData=> <ProductItem product={itemData.item}>
                <Button color={COLORS.primary} title="Product Edit" onPress={()=> {navigation.navigate('EditProduct', {id: itemData.item.id})}}/>
                <Button color={COLORS.primary} title="Delete" onPress={()=> {onDeleteProduct(itemData.item.id)}}/> 
            </ProductItem>}
        />
    )
}

export default UserProductsScreen
