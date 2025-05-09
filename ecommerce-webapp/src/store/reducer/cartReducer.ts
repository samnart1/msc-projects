const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            if (existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                };
            }

        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };

        case "REMOVE_CART":
            return {
                ...state,
                cart: state.cart.filter(
                    (item) => item.productId !== action.payload.productId
                ),
            };

        default:
            return state;
    }
};
