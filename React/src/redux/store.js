import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import hotelReducer from './hotels/hotelSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({ 
    user: userReducer,
    hotel: hotelReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
})

export const persistor = persistStore(store)

export default store;