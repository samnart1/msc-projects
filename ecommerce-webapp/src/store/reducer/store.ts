import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import { thunk } from "redux-thunk";
import errorReducer from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    auth: { user: user },
    carts: { cart: cartItems },
};

const store = configureStore({
    reducer: {
        errors: errorReducer,
        products: productReducer,
        carts: cartReducer,
        auth: authReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

    preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
