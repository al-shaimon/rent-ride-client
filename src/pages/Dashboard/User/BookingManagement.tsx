import React, { useState } from "react";
import {
  useGetAllUserBookingQuery,
  useUpdateUserBookingMutation,
} from "../../../redux/features/booking/booking.api";

const BookingManagement: React.FC = () => {
  const {
    data: bookings,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllUserBookingQuery(undefined);
  const [updateUserBooking] = useUpdateUserBookingMutation();
  const [selectedBooking] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const showEditModal = (booking: any) => {
  //   setSelectedBooking(booking);
  //   setIsModalVisible(true);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const updateData = {
      date: formData.get("date"),
      startTime: formData.get("startTime"),
    };

    await updateUserBooking({ bookingId: selectedBooking._id, updateData });
    setIsModalVisible(false);
    refetch(); // Refetch bookings to update the UI
  };

  const handleDelete = async (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updateData = { isDeleted: true };
      await updateUserBooking({ bookingId, updateData });
      refetch(); // Refetch bookings to update the UI
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const renderBookings = () => {
    if (bookings && bookings.data.length > 0) {
      return bookings.data
        .filter((booking: any) => !booking.isDeleted)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((booking: any) => (
          <div
            key={booking._id}
            className="card mb-4 border border-gray-200 bg-base-100 shadow-md"
          >
            <div className="card-body">
              <h2 className="card-title">Booking ID: {booking._id}</h2>
              <p>
                <strong>Car Name:</strong> {booking.car.name}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Start Time:</strong> {booking.startTime}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    booking.paymentStatus
                      ? "font-medium text-green-500"
                      : booking.endTime
                        ? "font-medium text-yellow-500"
                        : booking?.approval
                          ? "font-medium text-green-500"
                          : "font-medium text-red-500"
                  }
                >
                  {booking.paymentStatus
                    ? "Payment Completed"
                    : booking.endTime
                      ? "Pending Payment"
                      : booking?.approval
                        ? "Upcoming"
                        : "Pending Approval"}
                </span>
              </p>

              <div className="card-actions justify-end space-x-2">
                {!booking?.approval && !booking.endTime && (
                  <>
                    {/* <button
                      className="btn btn-primary bg-primary dark:bg-warning"
                      onClick={() => showEditModal(booking)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="btn btn-error text-base-200"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Cancel Ride
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ));
    }

    return <div className="py-10 text-center">No bookings found.</div>;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Booking Management</h1>
      {renderBookings()}

      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal modal-open bg-gray-800 bg-opacity-75">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Edit Booking</h3>
              <form onSubmit={handleUpdate} className="mt-4 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={selectedBooking?.date}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Time</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    defaultValue={selectedBooking?.startTime}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="modal-action">
                  <button type="button" className="btn" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
