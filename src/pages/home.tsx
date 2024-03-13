import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton } from '../components/loader';
import ProductCard from '../components/product-card';
import { useLatestProductsQuery } from '../redux/api/productAPI';
import { addToCart } from '../redux/reducer/cartReducer';
import { cartItem } from '../types/typesall';
import React from 'react';

const Home = () => {

  const { data, isError, isLoading } = useLatestProductsQuery("");
  
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 1) toast.error("Out of Stock");

    dispatch(addToCart(cartItem));

toast.success("Added to cart successfully")
  };
  console.log(data?.products);
  if (isError) toast.error("Cannot  fetch products");

  return (
   
    <div className="home">
    <section></section>
      <h1>
         Latest Product

<Link className='findmore' to={'/search'}>More</Link>

      </h1>

      <main>
       
        {isLoading? <Skeleton width='80vw'/> : data?.products.map((i) => (<ProductCard
          key={i._id}
          productId={i._id}
          name={i.name}
          photo={i.photo}
          price={i.price}
          stock={i.stock}
          handler={addToCartHandler} />))}
      </main>
    </div>
  )
}

export default Home