import "react-datepicker/dist/react-datepicker.css";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Banner = () => {

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="my-auto md:px-0">
          <div className="text-center text-3xl font-semibold md:text-start md:text-3xl lg:text-5xl">
            <p>Find, book and</p>
            <p>rent a car Easily</p>
            <div className="w-72 ps-[58%] md:hidden lg:block lg:w-full lg:ps-[230px]">
              <img src="/banner-vector.svg" alt="banner-vector" />
            </div>
          </div>
          <p className="my-2 text-center text-[#272727] dark:text-slate-400 md:text-start lg:text-lg">
            Get a car wherever and whenever you <br /> need it with your IOS and
            Android device.
          </p>
          <div className="mb-10 mt-5 flex justify-center md:mb-0 md:justify-start">
            <Link to="/booking">
              <button className="btn flex w-36 items-center gap-2 rounded-md border-none bg-primary text-white">
                Book Now <GoArrowRight size={24} />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/car.webp" alt="car" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
