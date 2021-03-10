import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import productReducer from './store/reduceres/productReducer'
import cartReducer from './store/reduceres/cartReducer';
import orderReducer from './store/reduceres/orderReducer';
import ShopDrawerNavigator from './navigation/ShopDrawerNavigator';
import authReducer from './store/reduceres/auth';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopDrawerNavigator/>
      </NavigationContainer>
    </Provider>
  );
}

