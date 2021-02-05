import React from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import addToCart from '../../store/actions/cart'

const ProductsOverviewScreen = ({navigation}) => {

    const products = useSelector(state=> state.products.availableProducts)
    const dispatch = useDispatch()

    return (
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={itemData=> <ProductItem product={itemData.item} onProductDetail={()=> {navigation.navigate('ProductDetail', {productID: itemData.item.id, productTitle: itemData.item.title})}} onAddToCart={()=> {dispatch(addToCart(itemData.item))}}/>}
        />
    )
}

export default ProductsOverviewScreen
