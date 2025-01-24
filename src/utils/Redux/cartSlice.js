import {createSlice} from "@reduxjs/toolkit"


// redux uses immer library to still use vanilla redux 
// not mutate the state and use ... spread operator
// redux uses Immer for this 
// creates a proxy object
// earlier we had middleware and asyncThunk , 
// but now RTK Qury to make api call

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        items: [],
    },
    reducers:{
        //addItem is the action here
        addItem: (state, action) =>{
            //modifing or mutate  the state here
            state.items.push(action.payload);
        }, // these are reducer functions
        removeItem: (state, action) =>{
            state.items.pop(action.payload);
        },
        clearCart:(state, action) =>{
            // if we change state directly , then it will
            // be changed locally only
            //RTK SYS- either mutate the existing state or 
            // return new state ... like return {items: []}
            state.items.length = 0;
        },

    } ,// reducer is also an object
});
export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;