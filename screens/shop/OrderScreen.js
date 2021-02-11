import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'

const OrderScreen = () => {

    const orders = useSelector(state=> state.orders.orders)

    return (
        <FlatList
            data={orders}
            keyExtractor={item=> item.id}
            renderItem={(itemData)=> <OrderItem order={itemData.item}/>}
        />
    )
}

export default OrderScreen
