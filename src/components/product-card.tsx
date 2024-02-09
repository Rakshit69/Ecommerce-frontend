import { FaPlus } from 'react-icons/fa';
import { server } from '../redux/store';
import { cartItem } from '../types/typesall';
type productProps = {
    productId: string,
    name: string,
    photo: string,
    price: number,
    stock: number,
    handler:(cartItem: cartItem)=>void
}

function ProductCard({
    productId,
    price,
    photo,
    stock,
    name,
    handler,
}: productProps) {
  return (
       <div className="product-card">
          <img src={`${server}/${photo}`} alt={name} />
          <p>{name}</p>
          <span>₹{price}</span>
          <div>
              <button onClick={() => handler({
                   productId,
                   price,
                   photo,
                   stock,
                  name,
                   quantity:1,
              })}>
                  <FaPlus/>
              </button>
            </div>
        </div>
  )
}

export default ProductCard