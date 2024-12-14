 
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useGetCarByIdQuery } from "../../redux/features/cars/cars.api";
import { CirclesWithBar } from "react-loader-spinner";

interface AdditionalFeature {
  id: string;
  name: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  nidOrPassport: string;
  drivingLicense: string;
  paymentInfo: string;
}

const BookingCarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading, error } = useGetCarByIdQuery(id || "");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [, setIsZooming] = useState<boolean>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm<BookingFormData>();

  const handleImageZoomIn = () => setIsZooming(true);
  const handleImageZoomOut = () => setIsZooming(false);

  const additionalFeatures: AdditionalFeature[] = [
    { id: "wifi", name: "WiFi" },
    { id: "sport", name: "Sports Mode" },
    { id: "hud", name: "Heads-Up Display (HUD)" },
  ];

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  const handleBookNowClick = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setValue("email", user.email || "");
    setValue("name", user.name || "");
    setValue("phone", user.phone || "");
    setShowModal(true);
  };

  const onSubmit = (data: BookingFormData) => {
    setShowModal(false);
    navigate("/confirmation", {
      state: {
        car: { ...car, id: id }, // Include the carId here
        bookingDetails: data,
        selectedFeatures,
      },
    });
  };

  const totalPrice = car ? car.pricePerHour : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CirclesWithBar
          height="100"
          width="100"
          color="#1572D3"
          outerCircleColor="#1572D3"
          innerCircleColor="#1572D3"
          barColor="#1572D3"
          ariaLabel="circles-with-bar-loading"
          visible={true}
        />
      </div>
    );
  }

  if (error)
    return <div>Error loading car details. Please try again later.</div>;
  if (!car) return <div>Car not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{car.name}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="image-container">
            <img
              src={car.image}
              alt={car.name}
              className="h-auto w-full rounded-lg shadow-lg"
              onMouseEnter={handleImageZoomIn}
              onMouseLeave={handleImageZoomOut}
            />
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-xl font-semibold">Features</h2>
            <ul className="list-inside list-disc">
              {car.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-xl font-semibold">Customer Reviews</h2>
            {car.reviews && car.reviews.length > 0 ? (
              car.reviews.map((review, index) => (
                <div key={index} className="mb-2">
                  <h3>{review}</h3>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Details</h2>
          <p className="mb-4">{car.description}</p>

          <p className="mb-2">Type: {car.carType}</p>
          <p className="mb-2">Color: {car.color}</p>
          <p className="mb-4">{car.isElectric ? "Electric" : "Non-Electric"}</p>

          <h3 className="mb-2 text-lg font-semibold">Additional Features</h3>
          <div className="space-y-2">
            {additionalFeatures.map((feature) => (
              <label key={feature.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleFeatureToggle(feature.id)}
                />
                <span>{feature.name}</span>
              </label>
            ))}
          </div>

          <h3 className="mb-2 mt-6 text-lg font-semibold">Insurance Options</h3>
          <p className="mb-4">
            We offer comprehensive insurance coverage with every rental. This
            includes liability, collision, and theft protection. You can drive
            with peace of mind knowing you're covered in case of any unforeseen
            events.
          </p>

          <h3 className="mb-2 mt-6 text-lg font-semibold">
            Cancellation Policy
          </h3>
          <p className="mb-4">
            Cancellations made at least 24 hours before the booking time are
            eligible for a full refund. Cancellations made within 24 hours of
            the booking time will incur a 50% charge. No refunds are available
            for no-shows or cancellations made after the booking time.
          </p>

          <p className="mt-6 text-2xl font-bold">
            Price: ${totalPrice.toLocaleString()} / hr
          </p>

          <button
            className="btn mt-6 rounded-md border-none bg-primary text-white"
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal for Booking Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-8">
            <h2 className="mb-4 text-2xl font-bold">Complete Your Booking</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full"
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Email</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        {...field}
                        type="email"
                        className="input input-bordered w-full"
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full"
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">
                  NID/Passport Number
                </label>
                <Controller
                  name="nidOrPassport"
                  control={control}
                  rules={{ required: "NID/Passport Number is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full"
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">
                  Driving License
                </label>
                <Controller
                  name="drivingLicense"
                  control={control}
                  rules={{ required: "Driving License is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full"
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-semibold">
                  Payment Info (bKash)
                </label>
                <Controller
                  name="paymentInfo"
                  control={control}
                  rules={{ required: "Payment Info is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full"
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-outline mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCarDetails;
