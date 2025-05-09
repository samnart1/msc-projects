import { Dispatch } from "redux";
import api from "../../api/api";
import toast from "react-hot-toast";

export const fetchProducts =
    (queryString: string) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.get(`public/products?${queryString}`);
            // console.log("API Response: ", data);

            dispatch({
                type: "FETCH_PRODUCTS",
                content: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload:
                    error?.response?.data?.message ||
                    "Failed to fetch products",
            });
        }
    };

export const fetchCategories =
    (queryString: string) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: "CATEGORY_LOADER" });
            const { data } = await api.get(`public/categories`);
            // console.log("API Response: ", data);

            dispatch({
                type: "FETCH_CATEGORIES",
                content: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            });
            dispatch({ type: "IS_ERROR" });
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload:
                    error?.response?.data?.message ||
                    "Failed to fetch products",
            });
        }
    };

export const addToCart =
    (data, qty = 1, toast) =>
    (dispatch: Dispatch, getState) => {
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= qty;

        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });

            toast.success(
                `${data?.productName} added to the cart successfully!`
            );

            localStorage.setItem(
                "cartItems",
                JSON.stringify(getState().carts.cart)
            );
        } else {
            toast.error(`${data?.productName} is out of stock!`);
        }
    };

// toast, currentQuantity, setCurrentQuantity;

export const increaseCartQuantity =
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch: Dispatch, getState) => {
        const { cart } = getState().carts;
        const item = cart.find((item) => item.productId === data.productId);

        console.log(data);
        console.log(getState());

        if (!item) {
            console.error("Error: Item not found in cart", data);
            toast.error("Item not found in cart!");
            return;
        }

        const newQuantity = currentQuantity + 1;

        setCurrentQuantity(newQuantity);

        dispatch({
            type: "INCREASE_QUANTITY",
            payload: item,
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().carts.cart)
        );

        toast.success(`Increased ${data.productName} to ${newQuantity}!`);

        // const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        // if (!item) {
        //     const newQuantity = currentQuantity + 1;
        //     setCurrentQuantity(newQuantity);

        //     dispatch({
        //         type: "ADD_CART",
        //         payload: { ...data, quantity: newQuantity },
        //     });

        //     localStorage.setItem(
        //         "cartItems",
        //         JSON.stringify(getState().carts.cart)
        //     );

        //     // toast.success("+1");
        // } else {
        //     toast.error("Quantity Reached to Limit!");
        // }
    };

export const decreaseCartQuantity =
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch: Dispatch, getState) => {
        const { cart } = getState().carts;
        const item = cart.find((item) => item.productId === data.productId);

        if (!item) {
            toast.error("Item not found in cart!");
            return;
        }

        const newQuantity = currentQuantity - 1;
        setCurrentQuantity(newQuantity);

        dispatch({
            type: "DECREASE_QUANTITY",
            payload: item,
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().carts.cart)
        );

        toast.success(
            `Decreased ${data.productName} from ${currentQuantity} to ${newQuantity}`
        );
    };

export const removeFromCart =
    (data, toast) => (dispatch: Dispatch, getState) => {
        const { cart } = getState().carts;
        const item = cart.find((item) => item.productId === data.productId);

        if (!item) {
            toast.error("Item is not found in cart!");
            return;
        }

        dispatch({
            type: "REMOVE_CART",
            payload: item,
        });

        toast.success(`${data.productName} removed from cart successfully!`);
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().carts.cart)
        );
    };

export const authenticateSignInUser =
    (sendData, toast, reset, navigate, setLoader) =>
    async (dispatch: Dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login Success!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Internal Server Error!"
            );
        } finally {
            setLoader(false);
        }
    };

export const registerNewUser =
    (sendData, toast, reset, navigate, setLoader) =>
    async (dispatch: Dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "User registered successfully!");
            navigate("/login");
        } catch (error) {
            console.log();
            toast.error(
                error?.response?.data?.message ||
                    error?.response?.data?.password ||
                    "Internal server error"
            );
        } finally {
            setLoader(false);
        }
    };

export const logOutUser = (navigate) => (dispatch: Dispatch) => {
    dispatch({ type: "LOG_OUT" });

    localStorage.removeItem("auth");
    navigate("/login");
};

export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) =>
    async (dispatch: Dispatch, getState) => {
        // const { user } = getState().auth;
        dispatch({ type: "BUTTON_LOADER" });
        try {
            const { data } = await api.post("/addresses", sendData);
            toast.success("Address saved successfully!");
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Internal server error!"
            );
            dispatch({ type: "IS_ERROR", payload: null });
        } finally {
            setOpenAddressModal(false);
        }
    };

export const getUserAddresses = () => async (dispatch: Dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/addresses`);
        dispatch({
            type: "USER_ADDRESS",
            payload: data,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload:
                error?.response?.data?.message ||
                "Failed to fetch user addresses",
        });
    }
};

export const selectUserCheckoutAddress = (address: any) => {
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
}

export default fetchProducts;
