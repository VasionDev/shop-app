import React, { useReducer, useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constant/color'
import { useDispatch } from 'react-redux'
import { userSignup, userSignin } from '../../store/actions/auth';

const USER_LOGIN = 'USER_LOGIN'

const userReducer = (state, action) => {
    if(action.type === USER_LOGIN) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input] : action.value
        }

        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input] : action.isValid
        }

        return {
            ...state,
            inputValues: updatedInputValues,
            inputValidities: updatedInputValidities
        }
    }
    return state
}

const AuthScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isSignInMode, setIsSignInMode] = useState(true)

    const [userState, userDispatch] = useReducer(userReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        }, 
        formIsValid: false
    })

    useEffect(()=>{
        if(error) {
            Alert.alert('Auth Error!', error, [{text: 'Okay'}])
        }
    }, [error])

    const inputChangeHandler = (inputValue, inputIdentifier) => {
        let isValid = true
        if(inputValue.length === 0) {
            isValid = false
        }
        userDispatch({
            type: USER_LOGIN, 
            value: inputValue, 
            input: inputIdentifier,
            isValid: isValid
        })
    }

    const userAuthHandler = async () => {

        if( userState.inputValues.email === '' || userState.inputValues.password === '' ) {
            Alert.alert('Value Error!', 'Input field should not be empty', [{text: 'Okay'}])
            return
        }
        setError(null)
        setIsLoading(true)
        let action;
        if(isSignInMode) {
            action = await userSignin(userState.inputValues.email, userState.inputValues.password)
        }else {
            action = await userSignup(userState.inputValues.email, userState.inputValues.password)
            
        }
        try{
            await dispatch(action)
        }catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    return (
        <View style={styles.form}>
            <LinearGradient style={styles.bgColor} colors={['#6883bc', '#8a307f']}>
                <View style={styles.container}>
                    <View style={styles.inputContiner}>
                        <Text>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={userState.inputValues.email}
                            onChangeText={(value) =>inputChangeHandler(value, 'email')}
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.inputContiner}>
                        <Text>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={userState.inputValues.password}
                            onChangeText={(value)=>inputChangeHandler(value, 'password')}
                            keyboardType='default'
                            returnKeyType='next'
                            autoCapitalize='none'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            {isLoading ? <ActivityIndicator size='large' color={Colors.primary}/> : <Button title={isSignInMode ? 'Sign in' : 'Sign up'} color={Colors.primary} onPress={userAuthHandler}/>}
                        </View>
                        <View style={styles.button}>
                            <Button title={`switch to ${isSignInMode ? 'Sign up' : 'Sign in'}`}color={Colors.accent} onPress={()=> setIsSignInMode(prevState=> !prevState)}/>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
    bgColor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 20
    },
    inputContiner: {
        marginVertical: 5
    },
    input: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    buttonContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 10
    }
})

export default AuthScreen
