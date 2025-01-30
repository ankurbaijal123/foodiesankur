import { createSlice } from "@reduxjs/toolkit";
//vanilla redux methods
// creating a copy of the state and then mutating that state and returning it

// the above things are still happening but it's happening behind the scenes
// redux uses a library named Immer, which finds the difference between the original state and the copy of it

//mutating the state here directly
// RTK query read
// redux dev tool

// redux uses Immer library to still use vanilla redux
// not mutate the state and use ... spread operator
// redux uses Immer for this
// creates a proxy object
// earlier we had middleware and asyncThunk,
// but now RTK Query to make API calls

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        //addItem is the action here
        addItem: (state, action) => {
            //modifying or mutating the state here
            // check if it is existing element then inc. the quantity 
            const existingItem = state.items.find(
                (item) => item.card.info.id === action.payload.card.info.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        }, // these are reducer functions
        removeItem: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.card.info.id === action.payload.card.info.id
            );
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.items = state.items.filter(
                    (item) => item.card.info.id !== action.payload.card.info.id
                );
            }
        },
        removePItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.card.info.id !== action.payload.card.info.id
            ); // remove particular item from store
        },
        clearCart: (state, action) => {
            // if we change the state directly, then it will
            // be changed locally only
            //RTK SYS- either mutate the existing state or
            // return new state ... like return {items: []}
            state.items.length = 0;
        },
    }, // reducer is also an object
});

export const { addItem, removePItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
