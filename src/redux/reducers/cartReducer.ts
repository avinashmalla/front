import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/cart";
import { Product, ProductInCart } from "../../types/products";

const initialState: ProductInCart[] = []

const cartSlice = createSlice({
    name: 'card reducer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {

    }
})

export const cartReducer = cartSlice.reducer