import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FetchProductsParams } from "../../types/products";

const initialState: Product[] = []
export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async({offset, limit}:FetchProductsParams) => {
        try{
            const data = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            const result = await data.json()
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
        addProduct: (state, action) => { //declare action types in here
            state.push(action.payload)
        },
        updateProduct: (state, action) => {
            console.log(action.payload)
            state.filter(product => {
                if(product.id === action.payload.id){
                    product = {
                        ...product,
                        ...action.payload.update
                    }
                }
            })
        },
        sortByCategory: (state, action: PayloadAction<string>) => {
            return state.filter(product => product.category.name = action.payload)
        },
        sortByPrice: (state, action) => {
            return state.filter(product => product.category.name = action.payload)
        },

        // deleteProduct: (state, action) => {
        //     return state.filter(product => product.id !== action.payload.id)
        // }

    },
    extraReducers: (build) => {
        build.addCase(fetchProducts.fulfilled, (state, action:PayloadAction<Product []>) => {
            const cleanObj = action.payload.filter(product => !product.title.toLowerCase().includes('nuevo') && !product.title.toLowerCase().includes('new') && product.images[0].includes("https://"))
            const newArr = cleanObj.sort((a,b) =>a.price - b.price)
            // console.log("sorted", newArr)
            return newArr

        })
        build.addCase(deleteProductASync.fulfilled, (state, action:PayloadAction<string | undefined>) => {
            return state.filter(product => product.id !== action.payload)
        })
    }
})

export const productReducer = productSlice.reducer
export const {addProduct,updateProduct} = productSlice.actions