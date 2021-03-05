import React, {useEffect, useState, useCallback} from 'react'
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'
import { featchOrder } from '../../store/actions/order'
import Colors from '../../constant/color'

const OrderScreen = () => {

    const orders = useSelector(state=> state.orders.orders)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    const loadingOrder = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try{
            await dispatch(featchOrder())
        }catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [setIsLoading, setError, dispatch])

    useFocusEffect(
        useCallback(()=> {
            loadingOrder()
        }, [loadingOrder])
    )

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }

    if(!isLoading && error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item=> item.id}
            renderItem={(itemData)=> <OrderItem order={itemData.item}/>}
        />
    )
}

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderScreen
