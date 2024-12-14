import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateUserInfoMutation } = userApi;
