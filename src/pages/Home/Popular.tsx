import { GoArrowRight } from "react-icons/go";
import { useGetAllCarsQuery } from "../../redux/features/cars/cars.api";
import { Link } from "react-router-dom";

const Popular = () => {
  const { data, isLoading, error } = useGetAllCarsQuery(undefined);

  if (isLoading) {
    return <div></div>;
  }

  if (error || !data || data?.data?.length === 0) {
    return <div>Failed to load cars.</div>;
  }

  const filteredCars = data?.data?.filter(
    (car) => car.status !== "unavailable" && !car.isDeleted,
  );

  // Take the first 4 cars from the filtered list
  const popularCars = filteredCars?.slice(0, 4);

  return (
    <div className="my-[84px]">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-6 w-56 rounded-lg bg-[#1572D31A] py-3">
          <p className="px-2 font-semibold text-primary">
            POPULAR RENTAL DEALS
          </p>
        </div>
        <h4 className="text-xl font-medium uppercase md:text-2xl lg:text-4xl">
          Most popular cars rental deals
        </h4>
      </div>

      <div className="grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {popularCars?.map((car) => (
          <div
            key={car._id}
            className="flex h-full w-80 transform flex-col justify-between rounded-lg bg-base-100 p-10 shadow-2xl transition-transform hover:scale-105"
          >
            <div>
              <img src={car.image} alt={car.name} className="mb-4" />

              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">{car.name}</p>
                <p className="text-sm">
                  <strong>Description: </strong>
                  {car.description}
                </p>
                <p className="text-sm">
                  <strong>Features: </strong>
                  {car.features.join(", ")}
                </p>
                <p className="text-sm">
                  <strong>Price: </strong>${car.pricePerHour} / hour
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <Link to={`/booking/${car._id}`}>
                <button className="btn flex w-44 items-center gap-2 rounded-md border-none bg-primary text-white">
                  Rent Now <GoArrowRight size={24} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
