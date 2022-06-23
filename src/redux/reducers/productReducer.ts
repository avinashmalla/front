import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/products";

const initialState: Product[] = []
export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async() => {
        try{
            const data = await fetch('https://api.escuelajs.co/api/v1/products')
            const result = await data.json()
            // console.log(result)
            return result
        } catch(error: any){
            console.log(error)
        }
    }
)

export const deleteProductASync = createAsyncThunk(
    'deleteProduct',
    async(productId:string) => {
        try{
            const data = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {method: 'DELETE'})
            return productId
        } catch(error: any){
            console.log(error)
        }
    }
)

const productSlice = createSlice({
    name: 'productReducer',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        },
        updateProduct: (state, action) => {
            state.filter(product => {
                if(product.id === action.payload.id){
                    product = {
                        ...product,
                        ...action.payload.update
                    }
                }
            })
        },
        deleteProduct: (state, action) => {
            return state.filter(product => product.id !== action.payload.id)
        }

    },
    extraReducers: (build) => {
        build.addCase(fetchProducts.fulfilled, (state, action:PayloadAction<Product []>) => {
            // return action.payload

            return action.payload.sort((a,b) =>a.price - b.price)
        })
        build.addCase(deleteProductASync.fulfilled, (state, action:PayloadAction<string | undefined>) => {
            return state.filter(product => product.id !== action.payload)
        })
    }
})

export const productReducer = productSlice.reducer
export const {addProduct,updateProduct, deleteProduct} = productSlice.actions