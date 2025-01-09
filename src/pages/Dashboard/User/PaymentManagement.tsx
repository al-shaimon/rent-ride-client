/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useGetAllUserBookingQuery,
  useUpdateUserBookingMutation,
} from "../../../redux/features/booking/booking.api";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// First, let's define the interface for CheckoutForm props
interface CheckoutFormProps {
  amount: number;
  bookingId: string;
  onSuccess: () => void;
}

// Update the CheckoutForm component signature
const CheckoutForm = ({ amount, bookingId, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [postalCode, setPostalCode] = useState("");
  const [updateUserBooking] = useUpdateUserBookingMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    toast.info("Processing payment...", { id: "processing" });

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)!,
      billing_details: {
        address: {
          postal_code: postalCode,
        },
      },
    });

    if (error) {
      toast.error(`Payment failed: ${error.message}`);
    } else {
      try {
        await updateUserBooking({
          bookingId,
          updateData: { paymentStatus: true },
        }).unwrap();
        toast.success("Payment successful!");

        // Redirect after success
        window.location.href = "/dashboard/bookings";

        // Call onSuccess callback
        onSuccess();
      } catch (err) {
        toast.error("Failed to update payment status. Please try again.");
      }
    }

    toast.dismiss("processing");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="rounded-md border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Card Number
          </label>
          <CardNumberElement
            id="card-number"
            className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
            options={{
              style: {
                base: {
                  color: "#000",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
            <label
              htmlFor="card-expiry"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Expiry Date
            </label>
            <CardExpiryElement
              id="card-expiry"
              className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
              options={{
                style: {
                  base: {
                    color: "#000",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          <div className="rounded-md border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
            <label
              htmlFor="card-cvc"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              CVC
            </label>
            <CardCvcElement
              id="card-cvc"
              className="rounded-md border border-gray-300 p-2 dark:border-gray-700"
              options={{
                style: {
                  base: {
                    color: "#000",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="rounded-md border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postal-code"
            value={postalCode}
            placeholder="ZIP"
            min={5}
            max={5}
            onChange={(e) => setPostalCode(e.target.value)}
            className="rounded-md border border-gray-300 p-2 dark:bg-[#1F2937]"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn mt-4 rounded-md border-none bg-primary px-6 py-3 text-white"
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
    </form>
  );
};

interface Booking {
  _id: string;
  car: {
    name: string;
  };
  date: string;
  startTime: string;
  totalCost: number;
  paymentStatus: boolean;
}

const PaymentManagement = () => {
  const {
    data: bookingResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllUserBookingQuery(undefined, {
    refetchOnFocus: true,
  });
  const [unpaidBookings, setUnpaidBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (bookingResponse && bookingResponse.data) {
      const unpaid = bookingResponse.data.filter(
        (booking: Booking) => !booking.paymentStatus,
      );
      setUnpaidBookings(unpaid);
      localStorage.setItem("bookings", JSON.stringify(bookingResponse.data));
      refetch();
    }
  }, [bookingResponse, refetch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    toast.error("Error loading bookings. Please try again later.");
    return <div>Error loading bookings. Please try again later.</div>;
  }

  if (unpaidBookings.length === 0) {
    return (
      <div className="min-h-[50vh] py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-700">
          No Unpaid Bookings Available
        </h2>
        <p className="text-xl text-gray-500">
          We couldn't find any unpaid booking. Please book a car.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Manage Your Payments
      </h1>

      {unpaidBookings.map((booking) => (
        <div
          key={booking._id}
          className="mb-8 rounded-lg p-4 shadow-lg dark:bg-gray-800 dark:text-white"
        >
          <h2 className="mb-4 text-2xl font-semibold">Booking Details</h2>
          <p className="text-lg">Car: {booking.car.name}</p>
          <p className="text-lg">
            Booking Date: {new Date(booking.date).toLocaleDateString()}
          </p>
          <p className="text-lg">Start Time: {booking.startTime}</p>
          <p className="text-lg">
            Total Charges: ${booking.totalCost.toLocaleString()}
          </p>

          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={booking.totalCost}
              bookingId={booking._id}
              onSuccess={() => {}}
            />
          </Elements>
        </div>
      ))}
    </div>
  );
};

export default PaymentManagement;
