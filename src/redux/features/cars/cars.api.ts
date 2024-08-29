import { TCars, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/cars",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<TCars[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getCarById: builder.query<TCars, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminBooking"],
      transformResponse: (response: TResponseRedux<TCars>) => {
        if (response.data) {
          return response.data;
        } else {
          console.log("error from cars");
          return Promise.reject(new Error("Response data is undefined."));
        }
      },
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery } = carsApi;
