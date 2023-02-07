import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:[],
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.isFetching=false;
            state.error=false;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        }
    }
})

export const {loginStart,loginSuccess,loginFailure}=userSlice.actions;
export default userSlice.reducer;
