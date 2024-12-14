import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCarSide, FaDollarSign } from "react-icons/fa6";
import axios from "axios";

import { TCars } from "../../../types";
import { useGetAllCarsQuery } from "../../../redux/features/cars/cars.api";
import {
  useAddNewCarMutation,
  useManageCarsMutation,
} from "../../../redux/features/admin/admin.api";
import { toast } from "sonner";

const ManageCars = () => {
  const {
    data: allCars,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllCarsQuery(undefined);
  const [selectedCar, setSelectedCar] = useState<TCars | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm<TCars>();
  const [manageCars] = useManageCarsMutation();
  const [addNewCar] = useAddNewCarMutation();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const watchedFeatures = watch("features");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const filteredCars = allCars?.data?.filter((car) => !car.isDeleted);

  const handleEditClick = (car: TCars) => {
    setSelectedCar(car);
    reset(car); // Populate the form with car details
    (document.getElementById("edit_car_modal") as HTMLFormElement)?.showModal();
  };

  const handleAddCarClick = () => {
    reset(); // Reset the form for new car entry
    setIsAddModalOpen(true);
    (document.getElementById("add_car_modal") as HTMLFormElement)?.showModal();
  };

  const handleRemoveCarClick = (car: TCars) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${car.name}?`,
    );
    if (confirmDelete) {
      manageCars({ carId: car._id, updateData: { isDeleted: true } });
      refetch(); // Refetch cars data after deleting
      toast.success("Car removed successfully!", { duration: 2000 });
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qhuspmxh");
      formData.append("cloud_name", "dr4guscnl");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dr4guscnl/image/upload",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadProgress(percentCompleted);
              }
            },
          },
        );
        const imageUrl = response.data.secure_url;
        setValue("image", imageUrl);
        toast.success("Image uploaded", { duration: 2000 });
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed", { duration: 2000 });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpdateCar = async (formData: TCars) => {
    try {
      formData.pricePerHour = Number(formData.pricePerHour); // Ensure pricePerHour is a number
      formData.isElectric = Boolean(formData.pricePerHour); // Ensure pricePerHour is a number
      await manageCars({ carId: selectedCar?._id, updateData: formData }).unwrap();
      (document.getElementById("edit_car_modal") as HTMLFormElement)?.close();
      refetch(); // Refetch cars data after updating
    } catch (error: any) {
      console.error("Failed to update car:", error);
      toast.error("Failed to update car!", { duration: 2000 });
    }
  };

  const handleAddCar = async (formData: TCars) => {
    try {
      formData.pricePerHour = Number(formData.pricePerHour);
      formData.isElectric = Boolean(formData.pricePerHour);
      await addNewCar(formData).unwrap();
      (document.getElementById("add_car_modal") as HTMLFormElement)?.close();
      refetch(); // Refetch cars data after adding
      toast.success("Car added successfully!");
    } catch (error: any) {
      console.error("Failed to add car:", error);
      toast.error("Failed to add car!", { duration: 2000 });
    }
  };

  const handleCancel = () => {
    (document.getElementById("edit_car_modal") as HTMLFormElement)?.close();
    if (isAddModalOpen) {
      (document.getElementById("add_car_modal") as HTMLFormElement)?.close();
      setIsAddModalOpen(false);
    }
  };

  const handleFeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const currentFeatures = getValues("features") || [];
    if (checked) {
      setValue("features", [...currentFeatures, value]);
    } else {
      setValue(
        "features",
        currentFeatures.filter((feature) => feature !== value),
      );
    }
  };
  return (
    <div className="mx-auto mb-10 max-w-6xl">
      <div className="mb-10 flex-1">
        <h1 className="mb-3 text-3xl font-bold">Manage Cars</h1>
        <button
          className="btn bg-primary text-white"
          onClick={handleAddCarClick} // Open the Add Car modal
        >
          Add New Car
        </button>
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
                    ${car.pricePerHour} / hour
                  </span>
                </div>
                <div className="card-actions mt-4 justify-end">
                  <button
                    onClick={() => handleEditClick(car)}
                    className="btn rounded-md border-none bg-primary text-white"
                  >
                    Edit Car
                  </button>
                  <button
                    onClick={() => handleRemoveCarClick(car)}
                    className="btn rounded-md border-none bg-error text-white"
                  >
                    Remove Car
                  </button>
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

      {/* Modal for Editing Car */}
      <dialog id="edit_car_modal" className="modal">
        <form className="modal-box" onSubmit={handleSubmit(handleUpdateCar)}>
          <h3 className="text-lg font-bold">Edit Car</h3>

          <div className="py-4">
            <div className="form-control">
              <label className="label">Car Name</label>
              <input
                type="text"
                {...register("name")}
                className="input input-bordered"
                defaultValue={selectedCar?.name}
              />
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <textarea
                {...register("description")}
                className="textarea textarea-bordered"
                defaultValue={selectedCar?.description}
              />
            </div>
            <div className="form-control">
              <label className="label">Car Type</label>
              <select
                {...register("carType")}
                className="select select-bordered"
                defaultValue={selectedCar?.carType}
              >
                <option value="Electric">Electric</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">Color</label>
              <select
                {...register("color")}
                className="select select-bordered"
                defaultValue={selectedCar?.color}
              >
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">Electric</label>
              <input
                type="checkbox"
                {...register("isElectric")}
                className="checkbox"
                defaultChecked={selectedCar?.isElectric}
              />
            </div>
            <div className="form-control">
              <label className="label">Features</label>
              <div className="checkbox-group grid grid-cols-2 gap-1">
                {[
                  "AC",
                  "Bluetooth",
                  "Long Range Battery",
                  "Child Seat",
                  "GPS",
                  "Insurance",
                ].map((feature) => (
                  <label key={feature} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={feature}
                      checked={watchedFeatures?.includes(feature) || false}
                      onChange={handleFeatureChange}
                      className="checkbox"
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">Status</label>
              <select
                {...register("status")}
                className="select select-bordered"
                defaultValue={selectedCar?.status}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">Price Per Hour</label>
              <input
                type="number"
                {...register("pricePerHour")}
                className="input input-bordered"
                defaultValue={selectedCar?.pricePerHour}
              />
            </div>
            <div className="form-control">
              <label className="label">Image</label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info w-full"
                onChange={handleImageUpload}
              />
              {uploading && (
                <div className="mt-2">
                  <span>Uploading image...</span>
                  <progress
                    className="progress progress-primary w-full"
                    value={uploadProgress}
                    max="100"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Update Car
            </button>
            <button type="button" className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Modal for Adding New Car */}
      <dialog id="add_car_modal" className="modal">
        <form className="modal-box" onSubmit={handleSubmit(handleAddCar)}>
          <h3 className="text-lg font-bold">Add New Car</h3>

          <div className="py-4">
            {/* Form fields for adding new car */}
            <div className="form-control">
              <label className="label">Car Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              <p className="ps-1">
                {errors?.name && (
                  <span className="text-xs text-red-500">
                    Car name is required
                  </span>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="label">Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered"
              />
              <p className="ps-1">
                {errors?.description && (
                  <span className="text-xs text-red-500">
                    Description is required
                  </span>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="label">Car Type</label>
              <select
                {...register("carType", { required: true })}
                className="select select-bordered"
              >
                <option value="Electric">Electric</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
              </select>
              <p className="ps-1">
                {errors?.carType && (
                  <span className="text-xs text-red-500">
                    Please choose car type
                  </span>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="label">Color</label>
              <select
                {...register("color", { required: true })}
                className="select select-bordered"
              >
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
              </select>
              <p className="ps-1">
                {errors?.color && (
                  <span className="text-xs text-red-500">
                    Please choose color of the car
                  </span>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="label">Electric</label>
              <input
                type="checkbox"
                {...register("isElectric")}
                className="checkbox"
              />
            </div>
            <div className="form-control">
              <label className="label">Features</label>
              <div className="checkbox-group grid grid-cols-2 gap-1">
                {[
                  "AC",
                  "Bluetooth",
                  "Long Range Battery",
                  "Child Seat",
                  "GPS",
                  "Insurance",
                ].map((feature) => (
                  <label key={feature} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={feature}
                      onChange={handleFeatureChange}
                      className="checkbox"
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">Status</label>
              <select
                {...register("status", { required: true })}
                className="select select-bordered"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <p className="ps-1">
                {errors?.status && (
                  <span className="text-xs text-red-500">
                    Please choose status of the car
                  </span>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="label">Price Per Hour</label>
              <input
                type="number"
                {...register("pricePerHour", { required: true })}
                className="input input-bordered"
              />
              <p className="ps-1">
                {errors?.pricePerHour && (
                  <span className="text-xs text-red-500">
                    Please enter the price per hour
                  </span>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="label">Image</label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info w-full"
                onChange={handleImageUpload}
                required
              />
              {uploading && (
                <div className="mt-2">
                  <span>Uploading image...</span>
                  <progress
                    className="progress progress-primary w-full"
                    value={uploadProgress}
                    max="100"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Add Car
            </button>
            <button type="button" className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageCars;
