import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: null
}

export const userSlices = createSlice({
    name:"user",
    initialState,
    reducers: {
        login:(state,payload)=>{
            state.user=payload;
            state.isAuthenticated=true;
        },
        logout:(state,payload)=>{
            state.user=null;
            state.isAuthenticated=false;
        }
    }
});

export const {login,logout} = userSlices.actions;

export default userSlices.reducer;