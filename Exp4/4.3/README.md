# Shopping Cart Comparison: Context API vs Redux

## Project Structure

```
4.3/
├── src/
│   ├── data/
│   │   └── ProductData.jsx              # Shared product list
│   ├── context/
│   │   ├── CartContext.jsx              # Context creation
│   │   └── CartProvider.jsx             # Context provider with state
│   ├── store/
│   │   ├── store.js                     # Redux store configuration
│   │   └── cartSlice.js                 # Redux cart slice
│   ├── components/
│   │   ├── context/
│   │   │   ├── ProductListContext.jsx   # Products using Context
│   │   │   ├── CartItemsContext.jsx     # Cart items using Context
│   │   │   └── CartCountContext.jsx     # Cart count using Context
│   │   └── redux/
│   │       ├── ProductListRedux.jsx     # Products using Redux
│   │       ├── CartItemsRedux.jsx       # Cart items using Redux
│   │       └── CartCountRedux.jsx       # Cart count using Redux
│   ├── App.jsx                          # Main component with tab switching
│   └── main.jsx                         # Entry point with Redux Provider
├── index.html
├── package.json
└── vite.config.js
```

## Implementation Comparison

### Context API Implementation

**Files:**
- [src/context/CartContext.jsx](src/context/CartContext.jsx) - Creates global context
- [src/context/CartProvider.jsx](src/context/CartProvider.jsx) - Provider component with state

**Key Features:**
- `createContext()` creates CartContext
- `CartProvider` wraps components and manages state with `useState`
- `addItem()` - adds product to cart or increases quantity
- `removeItem()` - removes product from cart
- `useContext(CartContext)` in child components for access

### Redux Toolkit Implementation

**Files:**
- [src/store/cartSlice.js](src/store/cartSlice.js) - Cart slice with actions
- [src/store/store.js](src/store/store.js) - Redux store configuration

**Key Features:**
- `createSlice()` defines cart state and reducers
- `addItem` action - adds product to cart
- `removeItem` action - removes product from cart
- `useDispatch()` to trigger actions
- `useSelector()` to access state

## Shopping Cart Logic (Both Implementations)

1. **Products List** - Display all products with "Add to Cart" button
2. **Add to Cart** - If product exists, increase quantity; otherwise add new item
3. **Remove from Cart** - Delete product from cart
4. **Cart Count** - Display total items (sum of quantities)
5. **Cart Items** - Show all items in cart with quantities

## Key Differences

| Feature | Context API | Redux Toolkit |
|---------|-------------|---------------|
| Setup | Simple, built-in | Requires separate packages |
| State Management | useState in Provider | createSlice reducers |
| State Access | useContext | useSelector |
| State Update | Direct setState | dispatch actions |
| Boilerplate | Minimal | More code |
| Scalability | Good for small apps | Better for large apps |

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

✅ Context API with createContext() and Provider
✅ Redux Toolkit with slices and actions
✅ Same shopping cart logic in both implementations
✅ Cart count displayed in multiple components
✅ Add and remove items functionality
✅ Tab switching to compare implementations
✅ Suitable for lab experiment comparison
