import React from 'react'
import { Button, Text, View,StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import Colors from '../../constant/color'

const CartScreen = () => {

    const totalAmount = useSelector(state=> state.cart.totalAmount)
    const cartProducts = useSelector(state=>{
        const transformedCartPorduct = []
        for(let key in state.cart.items) {
            transformedCartPorduct.push({
                id: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartPorduct
    })

    return (
        <View style={styles.container}>
            <View style={styles.action}>
                <Text>Total Price: <Text>${totalAmount.toFixed(2)}</Text></Text>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.primary} title="Order Now"/>
                </View>
            </View>
            <Text style={styles.headerTitle}>Cart List</Text>
            <FlatList
                data={cartProducts}
                keyExtractor={item=> item.id}
                renderItem={itemData => <CartItem product={itemData.item}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    action: {
        shadowColor: '#ddd',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 7,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    buttonContainer: {

    },
    headerTitle: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default CartScreen
