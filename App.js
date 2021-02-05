import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ShopNavigator from './navigation/ShopNavigator';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import productReducer from './store/reduceres/productReducer'
import ShopDrawerNavigator from './navigation/ShopDrawerNavigator';
import cartReducer from './store/reduceres/cartReducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <ShopNavigator/> */}
        <ShopDrawerNavigator/>
      </NavigationContainer>
    </Provider>
  );
}

