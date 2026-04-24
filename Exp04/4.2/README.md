# Redux Toolkit Counter Application

## Project Structure

```
4.2/
├── src/
│   ├── store/
│   │   └── store.js                 # Redux store configuration
│   ├── features/
│   │   └── counter/
│   │       └── counterSlice.js       # Counter slice with actions
│   ├── components/
│   │   └── Counter.jsx               # Counter component using Redux
│   ├── App.jsx                       # Main component
│   └── main.jsx                      # Entry point with Redux Provider
├── index.html                        # HTML template
├── package.json                      # Dependencies
└── vite.config.js                    # Vite configuration
```

## Redux Implementation

### 1. Counter Slice (src/features/counter/counterSlice.js)
- **createSlice**: Defines counter state and actions
- **initialState**: Counter value starts at 0
- **increment action**: Increases counter by 1
- **decrement action**: Decreases counter by 1
- Redux Toolkit handles immutable updates automatically

### 2. Redux Store (src/store/store.js)
- **configureStore**: Configures the Redux store
- Combines counter reducer
- Automatically adds Redux DevTools support

### 3. Counter Component (src/components/Counter.jsx)
- **useSelector**: Accesses counter value from Redux state
- **useDispatch**: Gets dispatch function to trigger actions
- Displays current count
- Increment and Decrement buttons

### 4. App.jsx
- Main component that renders Counter

### 5. Entry Point (src/main.jsx)
- Wraps app with **Redux Provider**
- Passes store to Provider
- Makes Redux state available throughout the app

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open in browser at `http://localhost:3000`

## Redux Flow

1. User clicks Increment/Decrement button
2. `dispatch()` sends action to Redux
3. Reducer updates state immutably
4. `useSelector` detects state change
5. Component re-renders with new count

## Features Demonstrated

✅ Redux Toolkit setup with configureStore
✅ Slice pattern for state management
✅ Actions (increment, decrement)
✅ useSelector to read state
✅ useDispatch to update state
✅ Redux Provider wrapping app
✅ Centralized state management
✅ Simple, minimal counter example
