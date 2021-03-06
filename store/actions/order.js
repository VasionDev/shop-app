import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDER = 'SET_ORDER'

export const featchOrder = () => {
    return async (dispatch, getState) => {
        const userID = getState().auth.userID
        try{
            const response = await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/orders/${userID}.json`)
            if(!response.ok) {
                throw new Error('Something went wrong!')
            }
            const responseData = await response.json()
            const orderData = []
            for(let key in responseData) {
                orderData.push(new Order(key, responseData[key].cartItem, responseData[key].totalAmount, new Date(responseData[key].date)))
            }
            dispatch({type: SET_ORDER, orders: orderData})
        }catch (err) {
            throw err
        }
    }
}

const addOrder = (cartItem, totalAmount) => {

    return async (dispatch, getState) => {

        const date = new Date()
        const tokenID = getState().auth.token
        const userID = getState().auth.userID
        try{
            const response = await fetch(`https://shop-app-20645-default-rtdb.firebaseio.com/orders/${userID}.json/?auth=${tokenID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItem,
                    totalAmount,
                    date: date.toISOString()
                })
            })

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json()

            dispatch({type: ADD_ORDER, orderData: {id: responseData.name, items: cartItem, amount: totalAmount, date: date}})
        }catch (err) {
            throw err
        }
    }
}

export default addOrder