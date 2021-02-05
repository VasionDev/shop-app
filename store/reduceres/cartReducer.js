import CartItem from "../../models/cart-item"
import { ADD_TO_CART } from "../actions/cart"

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
            return {...state, items: {...state.items, [state.items[addedProduct.id]]: newOrUpdatedCartItem}, totalAmount: state.totalAmount + prodPrice}
    }
    return state
}

export default cartReducer