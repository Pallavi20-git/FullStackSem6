import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// Configure Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
