/* eslint-disable no-unused-vars */
import {
    configureStore, combineReducers, getDefaultMiddleware
  } from '@reduxjs/toolkit';

  import channelsReducer from './channelsSlice'

  const rootReducers = combineReducers({
    channelsReducer
  })

  const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
})

export default store