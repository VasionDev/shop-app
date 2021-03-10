export const USER_SIGNUP = 'USER_SIGNUP'
export const USER_SIGNIN = 'USER_SIGNIN'

export const userSignup = (email, password) => {
    return async dispatch => {

        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBp1OEfSbZp_mwZxAB0ZpvauvWfKw405Uc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })


            if(!response.ok) {
                const errorData = await response.json()
                console.log(errorData)
                if(errorData.error.message === 'EMAIL_EXISTS') {
                    throw new Error('The email address is already in use by another account.')
                }else if(errorData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    throw new Error('We have blocked all requests from this device due to unusual activity. Try again later.')
                }else {
                    throw new Error('Something went wrong!')
                }
            }

            const responseData = await response.json()
            dispatch({type: USER_SIGNUP, token: responseData.idToken, id: responseData.localId})
        }catch (err) {
            throw err
        }
    }
}

export const userSignin = (email, password) => {
    return async dispatch => {
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBp1OEfSbZp_mwZxAB0ZpvauvWfKw405Uc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })


            if(!response.ok) {
               
                const errorData = await response.json()
                console.log(errorData)
                if(errorData.error.message === 'INVALID_PASSWORD') {
                    throw new Error('Password was wrong!')
                }else if(errorData.error.message === 'EMAIL_NOT_FOUND') {
                    throw new Error('User not found!')
                }else {
                    throw new Error('Something went wrong!')
                }
            }

            const responseData = await response.json()
            dispatch({type: USER_SIGNIN, token: responseData.idToken, id: responseData.localId})
        }catch (err) {
            throw err
        }
    }
}