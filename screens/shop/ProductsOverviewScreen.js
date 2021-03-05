import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Button, View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import addToCart from '../../store/actions/cart'
import COLORS from '../../constant/color'
import { featchProduct } from '../../store/actions/product'

const ProductsOverviewScreen = ({navigation}) => {

    const products = useSelector(state=> state.products.availableProducts)
    const [isloading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    const loadingProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(featchProduct())
        }catch(err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [setIsLoading, setError, dispatch])

    useFocusEffect(
        useCallback(()=> {
            setIsLoading(true)
            loadingProducts().then(()=>{
                setIsLoading(false)
            })
        }, [loadingProducts])
    )

    /*useEffect(()=> {
        console.log('effect')
        loadingProducts()

    }, [dispatch, loadingProducts])*/

    if(isloading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={COLORS.primary}/>
        </View>
    }

    if(!isloading && products.length === 0) {
        return (<View style={styles.centered}>
            <Text>No products found</Text>
        </View>)
    }

    if(error) {
        return (<View style={styles.centered}>
            <Text>Something went wrong</Text>
        </View>)
    }

    return (
        <FlatList
            onRefresh={loadingProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item=>item.id}
            renderItem={itemData=> <ProductItem product={itemData.item}>
                <Button color={COLORS.primary} title="Product Detail" onPress={()=> {navigation.navigate('ProductDetail', {productID: itemData.item.id, productTitle: itemData.item.title})}}/>
                <Button color={COLORS.primary} title="Add to Cart" onPress={()=> {dispatch(addToCart(itemData.item))}}/>
            </ProductItem>}
        />
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen
