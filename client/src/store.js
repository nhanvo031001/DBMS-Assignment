import {configureStore} from "@reduxjs/toolkit";
import bookReducer from './redux/bookReducer';

export default configureStore({
    reducer: {
        book: bookReducer,
    }
})