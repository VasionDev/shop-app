import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'

export const featchProduct = () => {
    return async dispatch => {

        try {
            const response = await fetch('https://shop-app-20645-default-rtdb.firebaseio.com/products.json')
            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
            const responseData = await response.json()
            const productData = []

            for(let key in responseData) {
                productData.push(new Product(key, 'u1', responseData[key].title, responseData[key].imageUrl, responseData[key].description, responseData[key].price))
            }

            dispatch({
                type: SET_PRODUCT,
                products: productData
            })
        }catch (err) {
            throw err
        }
    }
}

export const deleteProduct = (prodID) => {

    return async dispatch => {

        await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/products/${prodID}.json`, {
            method: 'DELETE'
        })

        dispatch({type: DELETE_PRODUCT, productID: prodID})
    }
}

export const updateProduct = (id, title, imageUrl, description, price) => {

    return async dispatch => {

        try{

            const response = await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/products/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                    price
                })

            })

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }

            dispatch({type: UPDATE_PRODUCT, productID:id, productData: { title, imageUrl, description, price} })
        }catch (err) {
            throw err
        }
    }
}

export const addProduct = (title, imageUrl, description, price) => {

    return async dispatch => {

        const response = await fetch('https://shop-app-20645-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price
            })
        })

        const responseData = await response.json()
        dispatch({
            type: ADD_PRODUCT, productData: { id: responseData.name, title, imageUrl, description, price}
        })
    }
}