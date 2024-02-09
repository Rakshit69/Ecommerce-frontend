import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userReducerIntitialState } from "../../types/reducer-types";
import { User } from "../../types/typesall";
const initialState:userReducerIntitialState = {
    user: null,
    loading:true,
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action:PayloadAction<User>) => {
            state.loading = false;
            state.user=action.payload
        },
        userNotExist: (state) => {
            state.loading = false;
            state.user = null;
        },
    }
});

export const { userExist, userNotExist } = userReducer.actions;