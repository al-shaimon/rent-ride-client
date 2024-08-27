import { GoArrowRight } from "react-icons/go";

const Popular = () => {
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
        {/* Car 1 */}
        <div className="w-80 transform rounded-lg bg-base-100 p-10 shadow-2xl transition-transform hover:scale-105">
          <img src="/jaguar.png" alt="jaguar" />

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Jaguar XE L P250</p>
            <p className="text-sm">
              <strong> Description: </strong>An electric car with advanced
              technology and performance.
            </p>
            <p className="text-sm">
              <strong>Features: </strong>AC, Bluetooth, Long Range Battery
            </p>
            <p className="text-sm">
              <strong>Price: </strong>$500 / hour
            </p>
            <div className="mt-5 flex justify-center">
              <button className="btn flex w-44 items-center gap-2 rounded-md border-none bg-primary text-white">
                Rent Now <GoArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
        {/* Car 2 */}
        <div className="w-80 transform rounded-lg bg-base-100 p-10 shadow-2xl transition-transform hover:scale-105">
          <img src="/jaguar.png" alt="jaguar" />

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Jaguar XE L P250</p>
            <p className="text-sm">
              <strong> Description: </strong>An electric car with advanced
              technology and performance.
            </p>
            <p className="text-sm">
              <strong>Features: </strong>AC, Bluetooth, Long Range Battery
            </p>
            <p className="text-sm">
              <strong>Price: </strong>$500 / hour
            </p>
            <div className="mt-5 flex justify-center">
              <button className="btn flex w-44 items-center gap-2 rounded-md border-none bg-primary text-white">
                Rent Now <GoArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
        {/* Car 3*/}
        <div className="w-80 transform rounded-lg bg-base-100 p-10 shadow-2xl transition-transform hover:scale-105">
          <img src="/jaguar.png" alt="jaguar" />

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Jaguar XE L P250</p>
            <p className="text-sm">
              <strong> Description: </strong>An electric car with advanced
              technology and performance.
            </p>
            <p className="text-sm">
              <strong>Features: </strong>AC, Bluetooth, Long Range Battery
            </p>
            <p className="text-sm">
              <strong>Price: </strong>$500 / hour
            </p>
            <div className="mt-5 flex justify-center">
              <button className="btn flex w-44 items-center gap-2 rounded-md border-none bg-primary text-white">
                Rent Now <GoArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
        {/* Car 4 */}
        <div className="w-80 transform rounded-lg bg-base-100 p-10 shadow-2xl transition-transform hover:scale-105">
          <img src="/jaguar.png" alt="jaguar" />

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Jaguar XE L P250</p>
            <p className="text-sm">
              <strong> Description: </strong>An electric car with advanced
              technology and performance.
            </p>
            <p className="text-sm">
              <strong>Features: </strong>AC, Bluetooth, Long Range Battery
            </p>
            <p className="text-sm">
              <strong>Price: </strong>$500 / hour
            </p>
            <div className="mt-5 flex justify-center">
              <button className="btn flex w-44 items-center gap-2 rounded-md border-none bg-primary text-white">
                Rent Now <GoArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
