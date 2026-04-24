import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  value: 0
};

// Create counter slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Increment action
    increment: (state) => {
      state.value += 1;
    },
    // Decrement action
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

// Export actions
export const { increment, decrement } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
