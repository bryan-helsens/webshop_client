import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const initialState = {
    isCartOpen: false,
    cart: cart,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    
        addToCart: (state, action) => {

            const itemIndex = state.cart.findIndex((item) => item.id === action.payload.item.id);
            console.log(itemIndex);

            if (itemIndex < 0){
                state.cart = [...state.cart, action.payload.item];
            }else{
                state.cart[itemIndex].count = action.payload.item.count;          
            }
        },
    
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item
            })
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item
            })
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    }    
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;