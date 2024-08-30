import { useState } from "react";
import { Link } from "react-router-dom";
import { TCars } from "../../types";
import { useGetAllCarsQuery } from "../../redux/features/cars/cars.api";
import { CirclesWithBar } from "react-loader-spinner";
import { FaCarSide, FaDollarSign } from "react-icons/fa";

const BookingCarList = () => {
  const [filters, setFilters] = useState({
    carType: "",
    minPrice: "",
    maxPrice: "",
    features: {
      AC: false,
      Bluetooth: false,
      "Long Range Battery": false,
      "Child Seat": false,
      GPS: false,
      Insurance: false,
    },
  });

  const { data, isLoading, error } = useGetAllCarsQuery([]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      features: { ...prev.features, [name]: checked },
    }));
  };

  const filteredCars = data?.data?.filter((car: TCars) => {
    const typeMatch = filters.carType === "" || car.carType === filters.carType;
    const minPriceMatch =
      filters.minPrice === "" || car.pricePerHour >= parseInt(filters.minPrice);
    const maxPriceMatch =
      filters.maxPrice === "" || car.pricePerHour <= parseInt(filters.maxPrice);
    const featureMatch = Object.entries(filters.features).every(
      ([feature, isChecked]) =>
        !isChecked ||
        car.features.includes(feature as keyof typeof filters.features),
    );
    const notDeleted = !car.isDeleted; // Check if the car is not deleted
    const isAvailable =
      car.status && car.status.toLowerCase() !== "unavailable"; // New condition to check if the car is available

    return (
      typeMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      featureMatch &&
      notDeleted &&
      isAvailable
    );
  });

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
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center text-center text-xl text-red-500">
        Error loading cars. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">Book a car</h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <select
          name="carType"
          onChange={handleFilterChange}
          value={filters.carType}
          className="select select-bordered w-full md:w-auto"
        >
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Electric">Electric</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="input input-bordered w-full md:w-auto"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="input input-bordered w-full md:w-auto"
        />
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <span className="text-xl font-semibold">Features:</span>
        {Object.keys(filters.features).map((feature) => (
          <label key={feature} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={feature}
              checked={
                filters.features[feature as keyof typeof filters.features]
              }
              onChange={handleFeatureChange}
              className="checkbox"
            />
            <span className="text-gray-700">{feature}</span>
          </label>
        ))}
      </div>

      {filteredCars && filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car: TCars) => (
            <div
              key={car._id}
              className="card bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              <figure className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-64 w-full object-cover"
                />
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-white">
                  {car.carType}
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl dark:text-black">
                  {car.name}
                </h2>
                <p className="text-gray-600">{car.description}</p>
                <div className="mt-2 flex items-center">
                  <FaCarSide className="mr-2 text-primary" />
                  <span className="dark:text-black">{car.carType}</span>
                </div>

                <div className="mt-2 flex items-center">
                  <FaDollarSign className="mr-2 text-primary" />
                  <span className="text-lg font-semibold dark:text-black">
                    ${car.pricePerHour.toLocaleString()} / hour
                  </span>
                </div>
                <div className="card-actions mt-4 justify-end">
                  <Link
                    to={`/booking/${car._id}`}
                    className="btn rounded-md border-none bg-primary text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-700">
            No Cars Available
          </h2>
          <p className="text-xl text-gray-500">
            We couldn't find any cars matching your criteria. Please try
            adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingCarList;
