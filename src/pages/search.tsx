import { useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/loader";
import { useDispatch } from "react-redux";
import { cartItem } from "../types/typesall";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const [search, setSearch] = useState("");

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError,
    error,
  } = useCategoriesQuery("");

  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(111111);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const { data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
    error:productError
  } = useSearchProductsQuery({
      search,
      price: maxPrice,
      page,
      category,
      sort,
    });
  console.log(searchedData);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 1) toast.error("Out of Stock");

    dispatch(addToCart(cartItem));

toast.success("Added to cart successfully")
  };
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (low to high)</option>
            <option value="dsc">Price (high to low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""} </h4>
          <input
            type="range"
            min={100}
            max={111111}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            value={maxPrice}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>

            {!categoriesLoading &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          value={search}
          placeholder="Search By name...."
          onChange={(e) => setSearch(e.target.value)}
        />
        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                photo={i.photo}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
              />
            ))}
            ;
          </div>
        )}
        {searchedData && searchedData.totalpage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              value={page}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalpage}
            </span>
            <button
              disabled={!isNextPage}
              value={page}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
