/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetAllAdminBookingQuery,
  useReturnCarMutation,
} from "../../../redux/features/admin/admin.api";
import { toast } from "sonner";
import dayjs from "dayjs";

type BookingData = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  user: { name: string };
  car: { name: string; ratePerHour: number } | null;
  totalCost: number;
  approval: boolean;
  isDeleted?: boolean;
};

type FormValues = {
  endTime: string;
};

const ManageReturnCars: React.FC = () => {
  const { data, error, isLoading, isFetching, refetch } =
    useGetAllAdminBookingQuery([]);
  const [returnCar] = useReturnCarMutation();
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    toast.error("Error loading bookings");
    return <p className="text-center text-red-500">Error loading bookings</p>;
  }

  const calculateTotalCost = (
    startTime: string,
    endTime: string,
    ratePerHour: number,
  ) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Calculate hours
    return Math.max(hours, 0) * ratePerHour; // Calculate total cost
  };

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (selectedBooking) {
      const { endTime } = formData;
      const totalCost = selectedBooking.car
        ? calculateTotalCost(
            selectedBooking.startTime,
            endTime,
            selectedBooking.car.ratePerHour,
          )
        : 0;

      console.log(totalCost);

      try {
        toast("Processing return...", { duration: 2000 }); // Show ongoing toast
        await returnCar({
          data: {
            bookingId: selectedBooking._id,
            endTime,
          },
        }).unwrap();
        toast.success(`Car returned successfully!`);
        setSelectedBooking(null);
        refetch();
      } catch (error) {
        toast.error("Failed to return car");
      }
    }
  };

  const openReturnModal = (booking: BookingData) => {
    setSelectedBooking(booking);
    setValue("endTime", booking.endTime);
  };

  const sortedBookings = data?.data
    .filter((booking: BookingData) => !booking.isDeleted && booking.approval) // Show only approved bookings that are not deleted
    .sort(
      (a: BookingData, b: BookingData) =>
        new Date(b.date).getTime() - new Date(a.date).getTime() ||
        new Date(`1970-01-01T${b.startTime}`).getTime() -
          new Date(`1970-01-01T${a.startTime}`).getTime(),
    );

  const convertTo12HourFormat = (time: string) => {
    return dayjs(`1970-01-01T${time}`).format("hh:mm A");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">
        Manage Return Cars
      </h1>

      {sortedBookings && sortedBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto overflow-hidden shadow-md">
            <thead className="">
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Car Model</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Start Time</th>
                <th className="border px-4 py-2">Total Cost</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((booking: BookingData) => (
                <tr key={booking._id} className="text-center">
                  <td className="border px-4 py-2">{booking.user.name}</td>
                  <td className="border px-4 py-2">
                    {booking.car?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">{booking.date}</td>
                  <td className="border px-4 py-2">
                    {convertTo12HourFormat(booking.startTime)}
                  </td>
                  <td className="border px-4 py-2">${booking.totalCost}</td>
                  <td className="border px-4 py-2">
                    {booking.endTime && booking.totalCost > 0 ? (
                      <span className="font-medium text-green-600">
                        Returned
                      </span>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => openReturnModal(booking)}
                      >
                        Return Car
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-center text-gray-500">No bookings available</p>
      )}

      {/* Return Modal */}
      {selectedBooking && (
        <dialog id="return_car" className="modal" open>
          <div className="modal-box rounded-md p-6 shadow-lg">
            <h2 className="mb-4 text-center text-xl font-bold">Return Car</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                  End Time
                </label>
                <input
                  type="time"
                  className="input input-bordered w-full"
                  {...register("endTime", {
                    min: selectedBooking.startTime,
                  })}
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary mb-2">
                  Confirm Return
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedBooking(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageReturnCars;
