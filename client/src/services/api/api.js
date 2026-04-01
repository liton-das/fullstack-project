import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({ baseUrl: `http://localhost:8080/`, credentials: "include" });
const ReAuth = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "auth/v1/refreshAccess-token", method: POST },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      result = await baseQuery(arg, api, extraOptions);
    } else {
      await baseQuery({ url: "auth/v1/logout", method: POST }, arg, api, extraOptions);
    }
  }
  return result;
};
export const blogApi = createApi({
  reducerPath: "api",
  baseQuery: ReAuth,
  endpoints: (build) => ({
    // Register api
    register: build.mutation({
      query: (data) => ({
        url: `auth/v1/register`,
        method: "POST",
        body: data,
      }),
    }),
    // verify-otp api
    VerifyOtp: build.mutation({
      query: (data) => ({
        url: "auth/v1/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    // resend otp api
    resendOtp: build.mutation({
      query: (data) => ({
        url: "auth/v1/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    // login api
    login: build.mutation({
      query: (data) => ({
        url: "auth/v1/login",
        method: "POST",
        body: data,
      }),
    }),
    // logout api
    logOut: build.mutation({
      query: (data) => ({
        url: "auth/v1/logout",
        method: "POST",
        body: data,
      }),
    }),
    // get user profile api
    getProfile: build.query({
      query: () => `auth/v1/get-profile`,
    }),
    // get user lists
    getUserLists: build.query({
      query: () => "auth/v1/get-user-lists",
    }),
    // get blog lists
    getBlogLists: build.query({
      query: () => "blog/v1/get-blog-lists",
    }),
    // create new Blog 
    createBlog:build.mutation({
      query:(data)=>({
        url: `blog/v1/create-blog`,
        method:"POST",
        body:data
      })
    }),
    // get blog by slug
    getReadBlog:build.query({
        query:(slug)=>`blog/v1/read/${slug}`
    }),
    // get comment lists
    getCommentLists: build.query({
      query: () => `blog/v1/get-all-comments`,
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
  useGetBlogListsQuery,
  useCreateBlogMutation,
  useGetCommentListsQuery,
  useGetReadBlogQuery,
  useLogOutMutation
} = blogApi;
