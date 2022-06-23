import { productReducer, addProduct,updateProduct, deleteProduct } from "../../redux/reducers/productReducer"
import { Product } from "../../types/products"
import { store } from "../../redux/store"
import { testProduct } from "../utils/product-utils"

const initialState: Product[] = []
// const currentState: Product[] = []

const fakeAction = {
    type: 'testing initialState',
    payload: {}
}



const addAction = {
    type: 'productReducer/addProduct',
    payload: testProduct
}

describe('Test actions in productReducer', () =>{
    test('If initialState gives the initial state', () => {
        const state = productReducer(initialState, fakeAction)
        expect(state.length).toEqual(0)
    })
    test('test add new product', () => {
        // const state = productReducer(initialState, addAction)
        // expect(state.length).toBe(1)
        store.dispatch(addProduct(testProduct))
        expect(store.getState().productReducer.length).toBe(1)
    })
    test('should update product', () => {
        // const state = productReducer()
    })
})