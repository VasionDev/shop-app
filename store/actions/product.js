import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SET_PRODUCT = 'SET_PRODUCT'

export const featchProduct = () => {
    return async (dispatch, getState) => {
        const userID = getState().auth.userID
        try {
            const response = await fetch('https://shop-app-20645-default-rtdb.firebaseio.com/products.json')
            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
            const responseData = await response.json()
            const productData = []

            for(let key in responseData) {
                productData.push(new Product(key, responseData[key].ownerId, responseData[key].title, responseData[key].imageUrl, responseData[key].description, responseData[key].price))
            }

            dispatch({
                type: SET_PRODUCT,
                products: productData,
                userProducts: productData.filter(product=> product.ownerId === userID)
            })
        }catch (err) {
            throw err
        }
    }
}

export const deleteProduct = (prodID) => {

    return async (dispatch, getState) => {
        const tokenID = getState().auth.token
        await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/products/${prodID}.json/?auth=${tokenID}`, {
            method: 'DELETE'
        })

        dispatch({type: DELETE_PRODUCT, productID: prodID})
    }
}

export const updateProduct = (id, title, imageUrl, description, price) => {

    return async (dispatch, getState) => {

        const tokenID = getState().auth.token
        const userID = getState().auth.userID

        try{

            const response = await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/products/${id}.json/?auth=${tokenID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                    price,
                    ownerId: userID
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

    return async (dispatch, getState) => {

        const tokenID = getState().auth.token
        const userID = getState().auth.userID
        const response = await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/products.json/?auth=${tokenID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId: userID
            })
        })

        const responseData = await response.json()
        dispatch({
            type: ADD_PRODUCT, productData: { id: responseData.name, title, imageUrl, description, price, userID}
        })
    }
}