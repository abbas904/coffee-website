import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ================= GET PRODUCTS =================
    getProducts: builder.query({
      query: ({ keyword } = {}) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    // ================= GET PRODUCT BY ID =================
    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    // ================= GET ALL PRODUCTS =================
    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allProducts`,
      providesTags: ["Products"],
    }),

    // ================= GET PRODUCT DETAILS =================
    getProductDetails: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      keepUnusedDataFor: 5,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    // ================= CREATE PRODUCT =================
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    // ================= UPDATE PRODUCT =================
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        "Products",
        { type: "Product", id: productId },
      ],
    }),

    // ================= UPLOAD IMAGE =================
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // ================= DELETE PRODUCT =================
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // ================= CREATE REVIEW =================
    createReview: builder.mutation({
      query: ({ productId, ...data }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),

    // ================= TOP PRODUCTS =================
    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // ================= NEW PRODUCTS =================
    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5,
    }),

    // ================= FILTER PRODUCTS =================
    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery,
} = productApiSlice;
