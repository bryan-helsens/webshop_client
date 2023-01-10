import { createSlice } from '@reduxjs/toolkit'

const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const initialState = {
    isCartOpen: false,
    cart: cart,
    totalPrice: 0,
    userInfo: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setUserData: (state, action) => {
            state.userInfo = action.payload;
        },

        setItems: (state, action) => {
            state.items = action.payload;
        },
    
        addToCart: (state, action) => {
            const itemIndex = state.cart.findIndex((item) => item.id === action.payload.item.id);
            console.log(itemIndex);

            if (itemIndex < 0){
                state.cart = [...state.cart, action.payload.item];
            }else{
                state.cart[itemIndex].quantity = action.payload.item.quantity;          
            }

            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
        },
    
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            
            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.quantity++;
                }
                return item
            })

            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.quantity > 1) {
                    item.quantity--;
                }
                return item
            })

            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

        calculateTotalPrice : (state) => {
            state.totalPrice = state.cart.reduce((total, item) => {
                return total + item.quantity * item.price;
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
    calculateTotalPrice,
    setUserData
} = cartSlice.actions;

export default cartSlice.reducer;