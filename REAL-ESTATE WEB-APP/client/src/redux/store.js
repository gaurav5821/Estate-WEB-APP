import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user: userReducer});

// redux persist to store user data in local storage

const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig , rootReducer);

// persisted reducer store previous user data globally after refresh , without it after refreshing user goes signout and again required to signin

export const store = configureStore({
  // reducer: {user: userReducer},
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    }),

});

export const persistor = persistStore(store);