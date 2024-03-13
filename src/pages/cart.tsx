import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import CartItem from "../components/cart-item";
import { addToCart, calculatePrice, discountApplied, rmeoveCartItem } from "../redux/reducer/cartReducer";
import { cartReducerIntitialState } from "../types/reducer-types";
import { cartItem } from "../types/typesall";
import axios from "axios";
import { server } from "../redux/store";
import React from "react";


const Cart = () => {

  const {
    subtotal,
    tax,
    shippingCharges,
    total,
    discount,
    cartItems
  } = useSelector((state: { cartReducer: cartReducerIntitialState }) =>
    state.cartReducer)
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
        cancelToken,
      })
        .then((res) => {
         dispatch(discountApplied(res.data.discount))
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        }).catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        })
    
     
    }, 1000);
    // happydiwali6000

return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    }
  }, [couponCode])
   const dispatch = useDispatch();
  const incrementHandler = (cartItem: cartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
      toast.error("Max Product  Reached!")
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1} ));

    };
    const decerementHandler = (cartItem: cartItem) => {
      if (cartItem.quantity <= 1) {
        toast.error("Minimum One Product needed");
        return;
      }
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1} ));
  
    };
 
  
  
    const remveHandler = (id:string) => {

      dispatch(rmeoveCartItem(id));
  toast.success("Product removed  from Cart!");
    };
 useEffect(() => {
   dispatch(calculatePrice());
 
 }, [cartItems])
 
  return (
    <div className="cart">
      <main>
        {
        cartItems.length >0 ?  (cartItems.map((card, idx) => (
          <CartItem key={idx} removeHandler={remveHandler} decerementHandler={decerementHandler}  incrementHandler={incrementHandler} cartItem={card} />
        ))): ( <h1> No Items Added </h1> )
       }
      </main>
      
      <aside>
      <p>Subtotal: ₹{subtotal}</p>
      <p>Tax: ₹{tax}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: {total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e)=>setCouponCode(e.target.value)}
        />
        {
          couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
              <span className="red">
                Invalid Coupon  <VscError/>
              </span>
          )
          )
        }


        {
          cartItems.length > 0 && 
            <Link to={"/shipping"}>Checkout</Link>
          
        }
      </aside>

    </div>
  )
}

export default Cart