import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerIntitialState } from "../../types/reducer-types";
import { ShippingInfo, cartItem } from "../../types/typesall";




const initialState: cartReducerIntitialState = {
    cartItems: [],
    loading: false,
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    shippingCharges: 0,
    shippingInfo: {
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
   
    },
};



export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        
        addToCart: (state, action: PayloadAction<cartItem>) => {
            state.loading = true;
            const index = state.cartItems.findIndex((i) => i.productId === action.payload.productId);
            if (index != -1) state.cartItems[index] = action.payload;
            else state.cartItems.push(action.payload);
            state.loading = false;
                 
        },
        rmeoveCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);
            state.loading = false;
            
        },
        calculatePrice: (state) => {
            const subtotal = state.cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
      
            state.subtotal = subtotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total =
              state.subtotal + state.tax + state.shippingCharges - state.discount;
        },
        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: () => initialState,
    }

});


export const {
    addToCart,
    rmeoveCartItem,
    calculatePrice,
    discountApplied,
    saveShippingInfo,
    resetCart
} = cartReducer.actions;

