import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/color'

const CartItem = ({product, onCartRemove, hideAction}) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{product.productTitle}</Text>
            <Text>{product.quantity} X ${product.productPrice.toFixed(2)}</Text>
            <View style={styles.action}>
                <Text>${product.sum.toFixed(2)} </Text>
                {!hideAction &&
                    <TouchableOpacity activeOpacity={0.5} onPress={onCartRemove}>
                        <Ionicons name="trash" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        width: '30%'
    }
})

export default CartItem
