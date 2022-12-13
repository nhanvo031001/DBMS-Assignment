import {configureStore} from "@reduxjs/toolkit";
import bookReducer from './redux/bookReducer';
import customerReducer from "./redux/customerReducer";
import ordersReducer from "./redux/ordersReducer";

export default configureStore({
    reducer: {
        book: bookReducer,
        customer: customerReducer,
        order: ordersReducer,
    }
})