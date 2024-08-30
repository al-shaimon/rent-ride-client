import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/features/cars/cars.api";
import { CirclesWithBar } from "react-loader-spinner";

interface AdditionalFeature {
  id: string;
  name: string;
}

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: car, isLoading, error } = useGetCarByIdQuery(id || "");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [, setIsZooming] = useState(false);

  const handleImageZoomIn = () => {
    setIsZooming(true);
  };

  const handleImageZoomOut = () => {
    setIsZooming(false);
  };

  const additionalFeatures: AdditionalFeature[] = [
    {
      id: "wifi",
      name: "WiFi",
    },
    {
      id: "sport",
      name: "Sports Mode",
    },
    {
      id: "hud",
      name: "Heads-Up Display (HUD)",
    },
  ];

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
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
          wrapperStyle={{}}
          wrapperClass=""
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
              car.reviews.map((index) => (
                <div key={index} className="mb-2">
                  {/* Render review content here */}
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

          <p className="mt-6 text-2xl font-bold">
            Price: ${totalPrice.toLocaleString()} / hr
          </p>

          <button className="btn mt-6 rounded-md border-none bg-primary text-white">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
