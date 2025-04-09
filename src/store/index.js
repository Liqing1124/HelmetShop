import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';

// Import reducers
import { cartReducer } from './reducers/cartReducers';
import { userReducer } from './reducers/userReducers';
import { productReducer, productDetailsReducer } from './reducers/productReducers';
import { orderReducer } from './reducers/orderReducers';

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  productList: productReducer,
  productDetails: productDetailsReducer,
  order: orderReducer
});

// Get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

// Get user info from localStorage
const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

// Initial state
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {}
  },
  user: {
    userInfo: userInfoFromStorage
  }
};

// Middleware
const middleware = [thunk];

// Setup Redux DevTools Extension
const composeEnhancers = 
  typeof window === 'object' && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : 
    compose => compose;

// Create enhancer
const enhancer = composeEnhancers(applyMiddleware(...middleware));

// Create store
const store = createStore(
  rootReducer,
  initialState,
  enhancer
);

export default store; 