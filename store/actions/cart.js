export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'

export const deleteFromCart = (prodID) => {
    return {type: DELETE_FROM_CART, productID: prodID}
}

const addToCart = (product) => {
    return {type: ADD_TO_CART, product: product}
}

export default addToCart