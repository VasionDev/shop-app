import PRODUCTS from '../../data/dummy-data'
import Product from '../../models/product'
import { DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from '../actions/product'
const initialState = {
    availableProducts: [],
    userProducts: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT:
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts,
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product=> product.id !== action.productID),
                availableProducts: state.availableProducts.filter(product=> product.id !== action.productID)
            }

        case ADD_PRODUCT:
            const newProduct = new Product(action.productData.id, action.productData.userID, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        
        case UPDATE_PRODUCT:
            const updatedIndex = state.availableProducts.findIndex(product=> product.id === action.productID)
            const updatedProduct = new Product(action.productID, state.availableProducts[updatedIndex].ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)
            const updatedAvailableProducts = [...state.availableProducts]

            const updatedUserIndex = state.userProducts.findIndex(product=> product.id === action.productID)
            const updatedUserProduct = new Product(action.productID, state.availableProducts[updatedUserIndex].ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)
            const updatedUserProducts = [...state.userProducts]

            updatedAvailableProducts[updatedIndex] = updatedProduct
            updatedUserProducts[updatedUserIndex] = updatedUserProduct

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }

            
    }
    return state
}

export default productReducer