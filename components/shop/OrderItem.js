import React, {useState} from 'react'
import Colors from '../../constant/color'
import { Button, Text, View, StyleSheet } from 'react-native'
import CartItem from './CartItem'
import Moment from 'moment';

const OrderItem = ({order}) => {

    const [viewDetails, setViewDetails] = useState(false)

    return (
        <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
                <Text style={styles.priceLabel}>Amount: <Text style={styles.price}>${order.totalAmount.toFixed(2)}</Text></Text>
                <Text style={styles.date}>{Moment(order.date).format('MMM Do YYYY, h:mm a')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title={!viewDetails? 'View Details' : 'Hide Details'} color={Colors.primary} onPress={()=>setViewDetails(prevState=> !prevState)}/>
            </View>
            {viewDetails && <View>
                {order.items.map((item) => <CartItem key={item.id} product={item} hideAction={true}/>)}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: '#ddd',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 7,
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 20,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5
    },
    priceLabel: {
        color: '#888',
        fontWeight: 'bold',
        fontSize: 15,
    },
    price: {
        color: Colors.primary,
    },
    date: {
        color: Colors.accent,
        fontWeight: 'bold',
        fontSize: 13,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    }
})

export default OrderItem
