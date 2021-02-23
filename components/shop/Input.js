import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Input = (props) => {
    return (
        <View style={styles.formControl}>
            <Text style={styles.lable}>Title</Text>
            <TextInput style={styles.input} value="" onChangeText={(text) => console.log(text)} onBlur={()=>console.log('on blur')} />
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        marginVertical: 5
    },
    lable: {
        fontWeight: 'bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
})

export default Input
