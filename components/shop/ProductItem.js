import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import COLORS from '../../constant/color'

const ProductItem = ({product, onProductDetail, onAddToCart}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: product.imageUrl}}/>
            </View>
            <View style={styles.detail}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button color={COLORS.primary} title="Product Detail" onPress={onProductDetail}/>
                <Button color={COLORS.primary} title="Add to Cart" onPress={onAddToCart}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#ddd',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 7,
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 300,
        margin: 20,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image:{
        width: '100%',
        height: '100%',
    },
    detail: {
        height: '15%',
        marginVertical: 5
    },
    title: {
        fontSize: 18,
        textAlign: 'center'
    },
    price: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center'
    },
    actions : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20,
    }
})

export default ProductItem
