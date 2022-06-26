import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: {user: User|undefined} = {user:undefined}

const userSlice = createSlice({
    name: 'userReducer',
    initialState: initialState,
    reducers:{
        login: (state: {user: User|undefined}, action: PayloadAction<User>) => {
            state.user = action.payload
            return state
        }
    },
    extraReducers: (build) => {

    }
})

export const {login} = userSlice.actions
export const userReducer = userSlice.reducer
