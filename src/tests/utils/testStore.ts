import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../../redux/reducers/cartReducer";
import { productReducer } from "../../redux/reducers/productReducer";
import { userReducer } from "../../redux/reducers/userReducer";

const createTestStore = () => {
    const store = configureStore({
        reducer: {
            productReducer,
            cartReducer,
            userReducer
        }
    })
    return store
}

export default createTestStore