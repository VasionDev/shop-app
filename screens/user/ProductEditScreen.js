import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet } from 'react-native'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import ShopHeaderButton from '../../components/shop/ShopHeaderButton'
import { updateProduct, addProduct } from '../../store/actions/product'

const ProductEditScreen = ({route, navigation}) => {
    const productID = route.params && route.params.id
    const product = useSelector(state=> state.products.userProducts.find(product=> product.id === productID))

    const dispatch = useDispatch()

    const [title, setTitle] = useState(product ? product.title : '')
    const [productImage, setProductImage] = useState(product ? product.imageUrl : '')
    const [price, setPrice] = useState(product ? product.price : '')
    const [description, setDescription] = useState(product ? product.description: '')

    const onProductAddedOrEdit = () => {
        if(productID) {
            dispatch(updateProduct(productID, title, productImage, description, price))
        }else {
            dispatch(addProduct(title, productImage, description, price))
        }

        navigation.goBack()
    }

    useEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
                    <Item title="save" iconName="ios-checkmark" onPress={() => {onProductAddedOrEdit()} }/>
                </HeaderButtons>
            )
        })
    }, [navigation, title, productImage, description, price])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={title=>setTitle(title)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Image URL</Text>
                    <TextInput style={styles.input} value={productImage} onChangeText={url=>setProductImage(url)} />
                </View>
        
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Price</Text>
                    <TextInput style={styles.input} keyboardType="decimal-pad" editable={!product} value={price.toString(10)} onChangeText={price=>setPrice(+price)}/>
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.lable}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={description=>setDescription(description)}/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%',
        marginVertical: 5
    },
    lable: {
        fontWeight: 'bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default ProductEditScreen
