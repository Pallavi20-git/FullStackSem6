# React Context API - Global State Management

## Project Structure

```
4.1/
├── src/
│   ├── context/
│   │   └── GlobalContext.jsx      # Context creation & Provider
│   ├── components/
│   │   ├── Counter.jsx             # Consumes count state
│   │   ├── ThemeToggle.jsx          # Consumes theme state
│   │   └── Dashboard.jsx            # Main container
│   ├── App.jsx                      # Main component wrapped with Provider
│   └── main.jsx                     # Entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies
└── vite.config.js                   # Vite configuration
```

## How It Works

### 1. Global Context (GlobalContext.jsx)
- **createContext()**: Creates a new context for global state
- **GlobalProvider**: Component that wraps the app and provides global state
- **useState**: Manages count and theme states
- **Global functions**: incrementCount, decrementCount, resetCount, toggleTheme

### 2. App.jsx
- Wraps the entire application with `<GlobalProvider>`
- Makes global state available to all child components

### 3. Child Components (Counter.jsx, ThemeToggle.jsx)
- Use **useContext(GlobalContext)** to access global state
- Can read and update global state without prop drilling

### 4. Theme Integration (Dashboard.jsx)
- Demonstrates theme switching with visual feedback
- Background and text color change based on global theme state

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

## Features Demonstrated

✅ Context API with createContext()
✅ Provider component storing state with useState
✅ useContext hook to consume global state
✅ No prop drilling - direct access to global state
✅ Multiple state values (count, theme)
✅ Global functions to update state
✅ Simple, minimal example suitable for lab experiment
