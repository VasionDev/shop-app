export const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = (product) => {
    return {type: ADD_TO_CART, product: product}
}

export default addToCart