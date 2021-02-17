export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'

export const deleteProduct = (prodID) => {
    return {type: DELETE_PRODUCT, productID: prodID}
}

export const updateProduct = (id, title, imageUrl, description, price) => {
    return {type: UPDATE_PRODUCT, productID:id, productData: { title, imageUrl, description, price} }
}

export const addProduct = (title, imageUrl, description, price) => {
    return {type: ADD_PRODUCT, productData: {title, imageUrl, description, price} }
}