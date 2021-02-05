import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'

const CartScreen = () => {

    const totalAmount = useSelector(state=> state.cart.totalAmount)

    return (
        <Text>total amount: {totalAmount}</Text>
    )
}

export default CartScreen
