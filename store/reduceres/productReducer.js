import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/product'
const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product=> product.id !== action.productID),
                availableProducts: state.availableProducts.filter(product=> product.id !== action.productID)
            }
    }
    return state
}

export default productReducer