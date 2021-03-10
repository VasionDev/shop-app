import { USER_SIGNIN, USER_SIGNUP } from "../actions/auth";

const initialState = {
    token: null,
    userID: null
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP:
            return {token: action.token, userID: action.id}
        case USER_SIGNIN:
            return {token: action.token, userID: action.id}
        default:
            return state
    }
}

export default authReducer