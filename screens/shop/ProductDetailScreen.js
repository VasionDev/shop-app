import React from 'react'
import { Image, View, Button, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

const ProductDetailScreen = ({route, navigation}) => {

    const {productID} = route.params

    const product = useSelector(state=> state.products.availableProducts.find(prod => prod.id === productID))

    return (
        <View>
            <Image style={styles.image} source={{uri: product.imageUrl}}/>
            <View style={styles.actions}>
                <Button title="Add to Cart"/>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20
    }
})

export default ProductDetailScreen
