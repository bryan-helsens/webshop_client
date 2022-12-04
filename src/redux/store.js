import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CartReducer from './cartSlice'
import AuthReducer from './authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    cart: CartReducer,
    auth: AuthReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
});

export default store;