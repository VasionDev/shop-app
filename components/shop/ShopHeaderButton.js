import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons'

const ShopHeaderButton = (props) => {
    return (
        <HeaderButton IconComponent={Ionicons} iconSize={23} color="#fff" {...props} />
    )
}

export default ShopHeaderButton
