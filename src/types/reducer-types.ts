import { ShippingInfo, User, cartItem } from "./typesall";

export interface userReducerIntitialState{
    user: User | null;
    loading: boolean;
}
export interface cartReducerIntitialState{
   
    loading: boolean;
    cartItems: cartItem[];
    subtotal: number;
    tax:number;
    discount:number;
    total:number;
    shippingCharges:number;
    shippingInfo: ShippingInfo;
}