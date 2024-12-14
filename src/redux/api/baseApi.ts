import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api",
  baseUrl: "https://car-rental-reservation-system-silk.vercel.app/api",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAccessToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  // if (result?.error?.status === 404) {
  //   toast.error((result?.error?.data as { message?: string })?.message);
  // }
  if (result?.error?.status === 403) {
    toast.error((result?.error?.data as { message?: string })?.message);
  }
  if (result?.error?.status === 401) {
    toast.error("Session expired. Please login again.");
    api.dispatch(logout()); //* Logout user if access token is expired
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["AdminBooking", "UserBooking"],
  endpoints: () => ({}),
});
