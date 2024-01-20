/* eslint-disable no-unused-vars */
import {
    configureStore, combineReducers, getDefaultMiddleware
  } from '@reduxjs/toolkit';

  import channelsReducer from './channelsSlice'
  import messagesReducer from './messagesSlice'

  const rootReducers = combineReducers({
    channelsReducer,
    messagesReducer
  })

  export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
})

