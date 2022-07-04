import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginType, User, UserReducerState } from "../../types/user";

const initialState: UserReducerState = {
    userList: [],
    currentUser: undefined
}

export const fetchAllUsers = createAsyncThunk(
    'fetchAllUsers',
    async (user: User) => {
        if (user.role === 'admin') {
            const response = await axios.get<User[]>('https://api.escuelajs.co/api/v1/users')
            console.log("how long", response.data.length)
            return response.data
        } else {
            return []
        }
    }
)

export const fetchSingleUser = createAsyncThunk(
    'fetchSingleUser',
    async (searchUser: string) => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/users')
            const userObj = response.data
            // console.log(userObj.filter(user => user.name === searchUser))
            return userObj.filter(user => user.name.includes(searchUser))
        } catch (error) {
            console.log(error)
        }
    }
)

export const loginAsync = createAsyncThunk(
    'loginAsync',
    async ({ email, password }: LoginType) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email, password
            })
            if (response.data.access_token) {
                if (!localStorage.getItem(`${email}`)) {
                    // console.log("Token not found, Adding it")
                    localStorage.setItem(`${email}`, response.data.access_token)

                }
                const user = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
                })
                // console.log("from loginAsync: ", user.data)
                return user.data
            } else {
                // console.log("from loginAsync: Undefined")
                return undefined
            }
        } catch (error) {
            console.log(error)
        }

    }
)

export const loginByToken = createAsyncThunk(
    'loginByToken',
    async (token: string) => {
        const user = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("from loginByToken: ", user.data)
        return user.data
    }
)


const userSlice = createSlice({
    name: 'userReducer',
    initialState: initialState,
    reducers: {
        // findSingleUser: (state, action: PayloadAction<string>) => {
        //     // state.userList.filter(user => user.name.toLowerCase() === action.payload.toLowerCase())
        //     console.log("findSingleUser reducer", state.userList.filter((user) => user.name === action.payload))
        //     // console.log("retList", retList)
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.userList = action.payload
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(loginByToken.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.userList = action.payload
            })
        }
})

// export const { findSingleUser } = userSlice.actions
export const userReducer = userSlice.reducer
