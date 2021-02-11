import Order from "../../models/order"
import { ADD_ORDER } from "../actions/order"

const initialState = {
    orders: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const order = new Order(new Date().toString(), action.orderData.items, action.orderData.amount, new Date())
            return {...state, orders: state.orders.concat(order)}
    }
    return state
}

export default orderReducer