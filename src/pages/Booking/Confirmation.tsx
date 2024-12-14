import { useLocation, useNavigate } from "react-router-dom";
import { useBookCarMutation } from "../../redux/features/booking/booking.api";
import { toast } from "sonner";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookCar, { isLoading }] = useBookCarMutation();

  const { car, bookingDetails, selectedFeatures } = location.state || {};

  if (!car || !bookingDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl font-semibold">
          No booking details found. Please try again.
        </p>
      </div>
    );
  }

  const handleConfirmOrder = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(" ")[0].slice(0, 5); // Format: HH:MM

    const bookingData = {
      carId: car.id,
      date: formattedDate,
      startTime: formattedTime,
      nidOrPassport: bookingDetails.nidOrPassport,
      drivingLicense: bookingDetails.drivingLicense,
      paymentInfo: bookingDetails.paymentInfo,
    };

    try {
      const result = await bookCar(bookingData).unwrap();
      toast.success("Booking confirmed successfully!");
      navigate("/dashboard", { state: { bookingResult: result } });
    } catch (error) {
      toast.error("Failed to confirm booking. Please try again.");
      console.error("Booking error:", error);
    }
  };
  return (
    <div className="container mx-auto max-w-xl p-4">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Booking Confirmation
        </h1>

        <div className="mt-4">
          <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
            Car Details
          </h2>
          <div className="flex flex-col space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {car.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Type:</span> {car.carType}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Color:</span> {car.color}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Power Source:</span>{" "}
              {car.isElectric ? "Electric" : "Non-Electric"}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
            Booking Details
          </h2>
          <div className="flex flex-col space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {bookingDetails.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span>{" "}
              {bookingDetails.email}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span>{" "}
              {bookingDetails.phone}
            </p>
            <p className="text-lg">
              <span className="font-semibold">NID/Passport:</span>{" "}
              {bookingDetails.nidOrPassport}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Driving License:</span>{" "}
              {bookingDetails.drivingLicense}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Payment Info:</span>{" "}
              {bookingDetails.paymentInfo}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 border-b pb-2 text-2xl font-semibold">
            Additional Features
          </h2>
          {selectedFeatures.length > 0 ? (
            <ul className="list-inside list-disc space-y-2 text-lg">
              {selectedFeatures.map((featureId: string, index: number) => (
                <li key={index}>{featureId}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg">No additional features selected.</p>
          )}
        </div>

        <div className="mt-12 flex justify-between">
          <button
            className="btn rounded-md border-none bg-gray-600 px-6 py-3 text-white"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="btn rounded-md border-none bg-primary px-6 py-3 text-white"
            onClick={handleConfirmOrder}
            disabled={isLoading}
          >
            {isLoading ? "Confirming..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
