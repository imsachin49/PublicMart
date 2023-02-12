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
        },
        removeProduct:(state,action)=>{
            state.quantity-=1;
            console.log("in redux")
            state.products=state.products.filter((item)=>item._id!==action.payload._id);
            state.total-=(action.payload.price*action.payload.quantity);
        }
    }
})

export const {addProduct,removeProduct}=cartSlice.actions;
export default cartSlice.reducer;

// state is the current state of the store i.e. the state before the action is dispatched
// action is the action that is dispatched 
// action.payload is the data that is passed with the action