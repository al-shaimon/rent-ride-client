import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserBooking: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/bookings/my-bookings",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    bookCar: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    updateUserBooking: builder.mutation({
      query: ({ bookingId, updateData }) => ({
        url: `/bookings/update-booking/${bookingId}`,
        method: "POST",
        body: updateData,
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    updateAdminBooking: builder.mutation({
      query: ({ bookingId, updateData }) => ({
        url: `/bookings/admin/update-booking/${bookingId}`,
        method: "POST",
        body: updateData,
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    deleteUserBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
  }),
});

export const {
  useGetAllUserBookingQuery,
  useBookCarMutation,
  useUpdateUserBookingMutation,
  useUpdateAdminBookingMutation,
  useDeleteUserBookingMutation,
} = bookingApi;
