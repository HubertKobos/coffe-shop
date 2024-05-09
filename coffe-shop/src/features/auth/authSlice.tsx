import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../types"

interface UserState extends User{}

// Retrieve the user state from localStorage
const userStateFromLocalStorage = localStorage.getItem("user")

// Parse JSON string into a JS object
const parsedUserState: UserState | null = userStateFromLocalStorage ? JSON.parse(userStateFromLocalStorage) : null

const initialState: UserState ={
    id: parsedUserState ? parsedUserState.id : null,
    email: parsedUserState ? parsedUserState.email : null,
    firstName: parsedUserState ? parsedUserState.firstName : null,
    surname: parsedUserState ? parsedUserState.surname : null,
    role: parsedUserState ? parsedUserState.role : null,
    token: parsedUserState ? parsedUserState.token : null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action: PayloadAction<User>) =>{
            const { id, email, firstName, surname, role, token } = action.payload;
            return {
                ...state,
                id,
                email,
                firstName,
                surname,
                role,
                token
            };
        },
        logout:(state) => {
            state.id = null,
            state.email = null,
            state.firstName = null,
            state.firstName = null,
            state.surname = null,
            state.role = null,
            state.token = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer