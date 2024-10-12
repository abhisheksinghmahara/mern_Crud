// src/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './folderstore/reducers'; 
const store = configureStore({
  reducer: rootReducer,
});

export default store;
