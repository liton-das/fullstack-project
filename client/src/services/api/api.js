import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({ baseUrl: `https://fullstack-project-nsri.vercel.app`, credentials: "include" });
const ReAuth = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/v1/refreshAccess-token", method: POST },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      result = await baseQuery(arg, api, extraOptions);
    } else {
      await baseQuery({ url: "/auth/v1/logout", method: POST }, arg, api, extraOptions);
    }
  }
  
  return result;
};
export const blogApi = createApi({
  reducerPath: "api",
  baseQuery: ReAuth,
  tagTypes: ["Blog"],
  endpoints: (build) => ({
    // Register api
    register: build.mutation({
      query: (data) => ({
        url: `/auth/v1/register`,
        method: "POST",
        body: data,
      }),
    }),
    // verify-otp api
    VerifyOtp: build.mutation({
      query: (data) => ({
        url: "/auth/v1/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    // resend otp api
    resendOtp: build.mutation({
      query: (data) => ({
        url: "/auth/v1/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    // login api
    login: build.mutation({
      query: (data) => ({
        url: "/auth/v1/login",
        method: "POST",
        body: data,
      }),
    }),
    // logout api
    logOut: build.mutation({
      query: () => ({
        url: "/auth/v1/logout",
        method: "POST",
      }),
      invalidatesTags: ["Blog"],
    }),
    // get user profile api
    getProfile: build.query({
      query: () => `/auth/v1/get-profile`,
      providesTags: ["Blog"],
    }),
    // get user lists
    getUserLists: build.query({
      query: () => "/auth/v1/get-user-lists",
      providesTags: ["Blog"],
    }),
    // get blog lists
    getBlogLists: build.query({
      query: ({ page = 1, limit = 10 }) => `/blog/v1/get-blog-lists?page=${page}&limit=${limit}`,
      providesTags: ["Blog"],
    }),
    // get search blog items
    getSearchItems: build.query({
      query: (searchItems) => `/blog/v1/search-tarms/${searchItems}`,
      
    }),
    // create new Blog
    createBlog: build.mutation({
      query: (data) => ({
        url: `/blog/v1/create-blog`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    // update blog
    updateBlog: build.mutation({
      query: ({ id, data }) => ({
        url: `/blog/v1/update-blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    // get blog by slug
    getReadBlog: build.query({
      query: (slug) => `/blog/v1/read/${slug}`,
      providesTags: ["Blog"],
    }),
    // get single blog by author id
    getSingleBlogByAuthorId: build.query({
      query: ({ page = 1, limit = 10}) => `/blog/v1/single-blog/?page=${page}&limit=${limit}`,
      providesTags: ["Blog"],
    }),

    createComment: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/blog/v1/create-comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    // get comment lists
    getCommentLists: build.query({
      query: () => `/blog/v1/get-all-comments`,
      providesTags: ["Blog"],
    }),
    // delete single blog
    deleteSingleBlog: build.mutation({
      query: (id) => ({
        url: `/blog/v1/delete-blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useGetProfileQuery,
  useGetUserListsQuery,
  useGetSingleBlogByAuthorIdQuery,
  useGetBlogListsQuery,
  useGetSearchItemsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useCreateCommentMutation,
  useGetCommentListsQuery,
  useDeleteSingleBlogMutation,
  useGetReadBlogQuery,
  useLogOutMutation
} = blogApi;
