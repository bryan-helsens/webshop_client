import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const initialState = {
    isCartOpen: false,
    cart: cart,
    items: [],
    totalPrice: 0,
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

            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
        },
    
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            
            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item
            })

            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item
            })

            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

        calculateTotalPrice : (state) => {
            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
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