import CartItem from "../../models/cart-item"
import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from "../actions/order"
import { DELETE_PRODUCT } from "../actions/product"

const initialState = {
    items: {},
    totalAmount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodTitle = addedProduct.title
            const prodPrice = addedProduct.price
            let newOrUpdatedCartItem;
            if(state.items[addedProduct.id]) {
                newOrUpdatedCartItem = new CartItem(state.items[addedProduct.id].quantity + 1, prodPrice, prodTitle, state.items[addedProduct.id].sum + prodPrice)
            }else {
                newOrUpdatedCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {...state, items: {...state.items, [addedProduct.id]: newOrUpdatedCartItem}, totalAmount: state.totalAmount + prodPrice}

        case DELETE_FROM_CART:
            let updatedItems
            const deletedProduct = state.items[action.productID]
            const quantity = deletedProduct.quantity
            const price = deletedProduct.productPrice
            const title = deletedProduct.productTitle
            const sum = deletedProduct.sum

            if(quantity > 1) {
                const updateItem = new CartItem( quantity - 1, price, title, sum - price )
                updatedItems = {...state.items, [action.productID]: updateItem}
            }else {
                updatedItems = {...state.items}
                delete updatedItems[action.productID]
            }

            return {...state, items: updatedItems, totalAmount: state.totalAmount - price }

        case ADD_ORDER:
            return initialState

        case DELETE_PRODUCT:

            if(!state.items[action.productID]) {
                return state
            }
            const updatedProductItems = {...state.items}
            const subtractionPrice = state.items[action.productID].sum
            delete updatedProductItems[action.productID]
            return {
                ...state,
                items: updatedProductItems,
                totalAmount: state.totalAmount - subtractionPrice
            }
    }
    return state
}

export default cartReducer