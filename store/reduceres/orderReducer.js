import Order from "../../models/order"
import { ADD_ORDER, SET_ORDER } from "../actions/order"

const initialState = {
    orders: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return {orders: action.orders}
        case ADD_ORDER:
            const order = new Order(action.orderData.id, action.orderData.items, action.orderData.amount, action.orderData.date)
            return {...state, orders: state.orders.concat(order)}
    }
    return state
}

export default orderReducer