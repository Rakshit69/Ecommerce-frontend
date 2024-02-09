import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductResponse, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest } from "../../types/api-types";


export const productAPI = createApi({
    reducerPath: "poductApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    tagTypes:["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<AllProductsResponse,string>(
            {
                query: () => "latest",
                providesTags: ["product"],
                
          }
        ),
        allProducts: builder.query<AllProductsResponse,string>(
            {
                query: (id) => `admin-product?id=${id}`,
                providesTags: ["product"],
          }
        ),
        categories: builder.query<CategoriesResponse,string>(
            {
                query: () => `categories`,
                providesTags: ["product"],
          }
        ),
        searchProducts: builder.query<SearchProductsResponse,SearchProductsRequest>(
            {
                query: ({ search, price, sort, page, category }) => {

                    let baseQuery = `all?search=${search}&page=${page}`;
                    if (price) baseQuery += `&price=${price}`;

                    if (sort) baseQuery += `&sort=${sort}`;

                    if (category) baseQuery += `&category=${category}`;

                    
                    return baseQuery;
                },
                providesTags: ["product"],
          }
        ),
        productDetails: builder.query<ProductResponse,string>(
            {
                query: (id) => id,
                providesTags: ["product"],
          }
        ),

        newwProduct: builder.mutation<MessageResponse,NewProductRequest>(
            {
                query: ({ id, formData }) => ({
                    url: `new?id=${id}`,
                    method: 'POST',
                    body: formData
                }),
                invalidatesTags: ["product"],
                
          }
        ),
        updateProduct: builder.mutation<MessageResponse,UpdateProductRequest>(
            {
                query: ({ userId,productId, formData }) => ({
                    url: `${productId}?id=${userId}`,
                    method: 'PUT',
                    body: formData
                }),
                invalidatesTags: ["product"],
                
          }
        ),
        deleteProduct: builder.mutation<MessageResponse,DeleteProductRequest>(
            {
                query: ({ userId,productId }) => ({
                    url: `${productId}?id=${userId}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ["product"],
                
          }
        ),
    }),
})

export const { useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewwProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,

} = productAPI;
