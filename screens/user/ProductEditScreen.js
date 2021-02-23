import React, { useReducer, useEffect, useCallback } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, Alert } from 'react-native'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import ShopHeaderButton from '../../components/shop/ShopHeaderButton'
import { updateProduct, addProduct } from '../../store/actions/product'

const INPUT_PRODUCT_FORM = 'INPUT_PRODUCT_FORM'

const formReducer = (state, action) => {
    if(action.type === INPUT_PRODUCT_FORM) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let validationForm = true
        for(const key in updatedInputValidities) {
            validationForm = validationForm && updatedInputValidities[key]
        }
        return {
            inputValues: updatedInputValues,
            inputValidities: updatedInputValidities,
            formIsValid: validationForm
        }
    }
    return state
}

const ProductEditScreen = ({route, navigation}) => {
    const productID = route.params && route.params.id
    const product = useSelector(state=> state.products.userProducts.find(product=> product.id === productID))

    const dispatch = useDispatch()

    const [formState, updateFormDispatch] = useReducer(formReducer, {

        type: INPUT_PRODUCT_FORM,
        inputValues: {
            title: product ? product.title : '',
            productImage: product ? product.imageUrl : '',
            price: product ? product.price : '',
            description: product ? product.description: ''
        },
        inputValidities: {
            title: product ? true : false,
            productImage: product ? true : false,
            price: product ? true : false,
            description: product ? true : false
        },
        formIsValid: product ? true : false
    })

    const onChangeProductForm = (text, inputIdentifier) => {

        let isValid = true
        if( text.trim().length === 0 ) {
            isValid = false
        }

        updateFormDispatch({
            type: INPUT_PRODUCT_FORM,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        })

    }

    /*const [title, setTitle] = useState(product ? product.title : '')
    const [productImage, setProductImage] = useState(product ? product.imageUrl : '')
    const [price, setPrice] = useState(product ? product.price : '')
    const [description, setDescription] = useState(product ? product.description: '')*/

    const onProductAddedOrEdit = useCallback(() => {


        if(!formState.formIsValid) {
            Alert.alert('Error!!', 'Invalid product information', [{text: 'Okay', style:'default'}])
            return
        }

        if(productID) {
            dispatch(updateProduct(productID, formState.inputValues.title, formState.inputValues.productImage, formState.inputValues.description, +formState.inputValues.price))
        }else {
            dispatch(addProduct(formState.inputValues.title, formState.inputValues.productImage, formState.inputValues.description, +formState.inputValues.price))
        }

        navigation.goBack()
    }, [navigation, formState.inputValues.title, formState.inputValues.productImage, formState.inputValues.description, formState.inputValues.price])

    useEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
                    <Item title="save" iconName="ios-checkmark" onPress={() => {onProductAddedOrEdit()} }/>
                </HeaderButtons>
            )
        })
    }, [navigation, formState.inputValues.title, formState.inputValues.productImage, formState.inputValues.description, formState.inputValues.price])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Title</Text>
                    <TextInput style={styles.input} value={formState.inputValues.title} onChangeText={(text) => onChangeProductForm(text, 'title')} onBlur={()=>console.log('on blur')} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Image URL</Text>
                    <TextInput style={styles.input} value={formState.inputValues.productImage} onChangeText={(text) => onChangeProductForm(text, 'productImage')} />
                </View>
        
                <View style={styles.formControl}>
                    <Text style={styles.lable}>Price</Text>
                    <TextInput style={styles.input} keyboardType="decimal-pad" editable={!product} value={formState.inputValues.price.toString(10)} onChangeText={(text) => onChangeProductForm(text, 'price')}/>
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.lable}>Description</Text>
                    <TextInput style={styles.input} value={formState.inputValues.description} onChangeText={(text) => onChangeProductForm(text, 'description')}/>
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
    },
})

export default ProductEditScreen
