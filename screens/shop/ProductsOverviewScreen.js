import React from 'react'
import { FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import addToCart from '../../store/actions/cart'
import COLORS from '../../constant/color'

const ProductsOverviewScreen = ({navigation}) => {

    const products = useSelector(state=> state.products.availableProducts)
    const dispatch = useDispatch()

    return (
        <FlatList
            data={products}
            keyExtractor={item=>item.id}
            renderItem={itemData=> <ProductItem product={itemData.item}>
                <Button color={COLORS.primary} title="Product Detail" onPress={()=> {navigation.navigate('ProductDetail', {productID: itemData.item.id, productTitle: itemData.item.title})}}/>
                <Button color={COLORS.primary} title="Add to Cart" onPress={()=> {dispatch(addToCart(itemData.item))}}/>
            </ProductItem>}
        />
    )
}

export default ProductsOverviewScreen
