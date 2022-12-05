import {createSlice} from "@reduxjs/toolkit";

export const bookSlice = createSlice({
    name: "book",

    initialState: {
        books: [],
    },

    reducers: {
        setBooks: (state, action) => {
            console.log("action.payload: ", action.payload)
            state.books = action.payload;
        },

    }
});

export const {
    setBooks,
} = bookSlice.actions;

export default bookSlice.reducer;