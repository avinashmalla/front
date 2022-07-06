import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/cart";
import { Product, ProductInCart } from "../../types/products";

const initialState: ProductInCart[] = []

const cartSlice = createSlice({
    name: 'cartReducer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // addProductToCart: (state, action) {
        //     console.log(action.payload)
        //     // state.push(action.payload)
        // }

    }
})

export const cartReducer = cartSlice.reducer