import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdminBooking: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addNewCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    manageCars: builder.mutation({
      query: ({ carId, updateData }) => ({
        url: `/cars/${carId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    returnCar: builder.mutation({
      query: ({ data }) => ({
        url: "/cars/return",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/auth/admin/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateSingleUserInfo: builder.mutation({
      query: ({ userId, updateData }) => ({
        url: `/auth/admin/users/${userId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
  }),
});

export const {
  useGetAllAdminBookingQuery,
  useAddNewCarMutation,
  useManageCarsMutation,
  useReturnCarMutation,
  useGetAllUsersQuery,
  useUpdateSingleUserInfoMutation,
} = adminApi;
