/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateUserInfoMutation } from "../../../redux/features/user/user.api";
import { useGetAllUserBookingQuery } from "../../../redux/features/booking/booking.api";

const UserOverview = () => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });
  console.log(userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      phone: userData?.phone || "",
    },
  });

  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  useEffect(() => {
    reset({
      name: userData?.name || "",
      phone: userData?.phone || "",
    });
  }, [userData, reset]);

  const onSubmit = async (data: any) => {
    try {
      const updatedUser = await updateUserInfo(data).unwrap();
      toast.success("Profile updated successfully!");

      localStorage.setItem("user", JSON.stringify(updatedUser.data));

      setUserData(updatedUser.data);
    } catch (error: any) {
      toast.error("Failed to update profile.");
    }
  };

  // Fetch user's booking data
  const { data: bookingData, isLoading: isBookingLoading } =
    useGetAllUserBookingQuery(undefined);

  console.log(bookingData);

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-lg bg-base-200 p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold">User Overview</h1>
      <div className="w-full">
        <h2 className="mb-2 text-center text-xl font-semibold">
          Profile Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
              type="text"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error">
                {errors?.name?.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input input-bordered w-full"
              type="email"
              value={userData.email}
              disabled
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              className={`input input-bordered w-full ${errors.phone ? "input-error" : ""}`}
              type="text"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-error">
                {errors?.phone?.message?.toString() ?? ""}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-md mt-4 w-full bg-primary text-white ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <h2 className="mb-2 mt-6 text-center text-xl font-semibold">
          Booking History
        </h2>

        {isBookingLoading ? (
          <div className="my-20 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Car Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {bookingData?.data?.length > 0 ? (
                  bookingData?.data.map((booking: any, index: number) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.car.name}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>{booking.startTime}</td>
                      <td>{booking.endTime || "N/A"}</td>
                      <td>{booking.totalCost}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className=" text-center">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOverview;
