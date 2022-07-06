import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType, ProductInCart } from "../../types/cart";

const initialState: CartType = {
    myCart: []
  };

const cartSlice = createSlice({
    name: 'cartReducer',
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<ProductInCart>) => {
            const productIndex = state.myCart.findIndex(
                product => product.id === action.payload.id
            )
            if (productIndex >= 0){
                state.myCart[productIndex].quantity += 1
            } else {
                state.myCart.push({
                    ...action.payload, quantity: action.payload.quantity
                })
            }
        },
        // getCartQuantity: (state, action) => {
        //     let qty = 0
        //     state.myCart.map((product) => {
        //         qty += product.quantity
        //     })
        //     // return qty
        // }

    },
    extraReducers: (builder) => {
        
    }
})

export const { addProductToCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer