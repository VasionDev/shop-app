import React from 'react'
import { FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import COLORS from '../../constant/color'
import { deleteProduct } from '../../store/actions/product'

const UserProductsScreen = () => {

    const userProducts = useSelector(state=> state.products.userProducts)
    const dispatch = useDispatch()

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item=>item.id}
            renderItem={itemData=> <ProductItem product={itemData.item}>
                <Button color={COLORS.primary} title="Product Edit" onPress={()=> {}}/>
                <Button color={COLORS.primary} title="Delete" onPress={()=> {dispatch(deleteProduct(itemData.item.id))}}/> 
            </ProductItem>}
        />
    )
}

export default UserProductsScreen
