import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { server } from '../redux/store';
import { cartItem } from '../types/typesall';
type cardIemProps = {
    cartItem: any,
    incrementHandler: (cartItem : cartItem)=>void
    decerementHandler: (cartItem : cartItem)=>void
    removeHandler: (id:string)=>void
};

const CartItem = ({ cartItem ,incrementHandler,decerementHandler,removeHandler}: cardIemProps) => {
    const {productId,name,price,quantity,photo}=cartItem
  return (
      <div className="cart-item">
          <img src={`${server}/${photo}`} alt={name} />
          <article>
              <Link to={`product/${productId}`}>{name}</Link>
              <span>{price}</span>
          </article>
          <div>
              <button onClick={()=>decerementHandler(cartItem)}>-</button>
              <p>{quantity}</p>
              <button onClick={()=>incrementHandler(cartItem)}>+</button>
          </div>
          <button onClick={()=>removeHandler(productId)}>
              <FaTrash/>
          </button>

    </div>
  )
}

export default CartItem