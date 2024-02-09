import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartReducerIntitialState } from "../types/reducer-types";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";
import { saveShippingInfo } from "../redux/reducer/cartReducer";




const Shipping = () => {

  const {
    total,  
    cartItems
  } = useSelector((state: { cartReducer: cartReducerIntitialState }) =>
    state.cartReducer);
  const {user}= useSelector((state:RootState)=>state.userReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ShippingInfo, setShippingInfo] = useState({
    address: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    // nothing more
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(ShippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
          ShippingInfo,
          name:user?.name!
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log("it is the errror"+error);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
   if(cartItems.length<=0) navigate("/cart")
  }, [cartItems])
  
  return (
    <div className="shipping">
      
      <button className="back-btn" onClick={()=>navigate('/cart')}>
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input
          type="text"
          placeholder="Address"
          required
          name="address"
          value={ShippingInfo.address}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="City"
          required
          name="city"
          value={ShippingInfo.city}
          onChange={changeHandler}
        />
          <input
            type="text"
            placeholder="State"
            required
            name="state"
            value={ShippingInfo.state}
            onChange={changeHandler}
        />

        <select
          required
          name="country"
          value={ShippingInfo.country}
          onChange={changeHandler}>
          <option value="">Country</option>
          <option value="india">India</option>
          </select>
            <input
              type="number"
              placeholder="Pin Code"
              required
              name="pincode"
              value={ShippingInfo.pincode}
              onChange={changeHandler}
            />
      <button type="submit">Pay Now</button>
        
      </form>

</div>
  
  )
}

export default Shipping