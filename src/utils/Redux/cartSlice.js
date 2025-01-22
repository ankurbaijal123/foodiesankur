import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState : {
        items: []
    },
    reducers:{
        //addItem is the action here
        addItem: (state, action) =>{
            state.items.push(action.payload);
        }, // these are reducer functions
        removeItem: (state, action) =>{
            state.items.pop(action.payload);
        },
        clearCart:(state, action) =>{
            state.items.length = 0;
        },

    } // reducer is also an object
})
export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;