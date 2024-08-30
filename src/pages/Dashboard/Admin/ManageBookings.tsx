/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllAdminBookingQuery } from "../../../redux/features/admin/admin.api";
import { useUpdateAdminBookingMutation } from "../../../redux/features/booking/booking.api";
import { useEffect } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";

type BookingData = {
  _id: string;
  date: string;
  startTime: string;
  user: { name: string };
  car: { name: string } | null;
  totalCost: number;
  approval: boolean;
  isDeleted?: boolean;
};

const ManageBookings = () => {
  const { data, error, isLoading, isFetching, refetch } =
    useGetAllAdminBookingQuery([]);

  const [updateAdminBooking] = useUpdateAdminBookingMutation();

  useEffect(() => {
    refetch(); // Ensure data is fresh on component mount
  }, [refetch]);

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

  const handleApproval = async (booking: BookingData) => {
    const confirmApproval = window.confirm(
      `Are you sure you want to approve the booking for ${booking.user.name}?`,
    );
    if (confirmApproval) {
      try {
        toast("Approving booking...", { duration: 2000 });
        await updateAdminBooking({
          bookingId: booking._id,
          updateData: { approval: true },
        });
        toast.success("Booking approved successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to approve booking");
      }
    }
  };

  const handleCancel = async (booking: BookingData) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel the booking for ${booking.user.name}?`,
    );
    if (confirmCancel) {
      try {
        toast("Cancelling booking...", { duration: 2000 });
        await updateAdminBooking({
          bookingId: booking._id,
          updateData: { isDeleted: true },
        });
        toast.success("Booking canceled successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    }
  };

  const sortedBookings = data?.data
    .filter((booking: BookingData) => !booking.isDeleted)
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
      <h1 className="mb-4 text-center text-2xl font-bold">Manage Bookings</h1>

      {sortedBookings && sortedBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto overflow-hidden shadow-md">
            <thead className="">
              <tr>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Car Model</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Start Time</th>
                <th className="border px-4 py-2">Status</th>
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

                  <td
                    className={`border px-4 py-2 ${
                      booking.approval ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.approval ? "Approved" : "Pending"}
                  </td>

                  <td className="border px-4 py-2">
                    {!booking.approval && (
                      <button
                        className="btn btn-sm mr-2 bg-primary text-white"
                        onClick={() => handleApproval(booking)}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="btn btn-error btn-sm text-white"
                      onClick={() => handleCancel(booking)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-center">No bookings available</p>
      )}
    </div>
  );
};

export default ManageBookings;
