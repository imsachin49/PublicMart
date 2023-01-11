import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity+=1;
            state.products.push(action.payload);    //for adding product to cart
            state.total+=(action.payload.price*action.payload.quantity);      //for adding price of product to total
        }
    }
})

export const {addProduct}=cartSlice.actions;
export default cartSlice.reducer;
