import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer  from './userSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import adminReducer from './adminSlice'

const rootReducer=combineReducers({user:useReducer,admin:adminReducer})

const persistConfig={
    key:'root',
    version:1,
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

 const Store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware({
        serializableCheck:false,
    }),
})
export default Store;
export const persistor=persistStore(Store)