import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiMapPin } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";

const Banner = () => {
  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate, endDate);

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
            <Link to="/cars">
              <button className="btn flex w-36 items-center gap-2 rounded-md border-none bg-primary text-white">
                Book Now <GoArrowRight size={24} />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/car.png" alt="car" />
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl gap-5 rounded-box bg-base-100 py-5 shadow-2xl md:grid-cols-3 md:items-center">
        <div className="mx-auto flex w-[225px] items-center justify-center gap-2">
          <FiMapPin size={32} />
          <div>
            <p className="font-bold">Location</p>
            <select className="select select-bordered w-full max-w-xs focus:outline-none">
              <option disabled selected>
                Search your location
              </option>
              <option>Barishal</option>
              <option>Chittagong</option>
              <option>Dhaka</option>
              <option>Khulna</option>
              <option>Rajshahi</option>
              <option>Rangpur</option>
              <option>Mymensingh</option>
              <option>Sylhet</option>
            </select>
          </div>
        </div>
        <div className="mx-auto flex w-[320px] items-center justify-end gap-2">
          <MdOutlineCalendarMonth size={32} />
          <div>
            <p className="font-bold">Pickup date</p>
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              onChange={(date) => {
                setStartDate(date as Date);
              }}
              className="bg-base-100"
            />
          </div>
        </div>
        <div className="mx-auto flex items-center">
          <Link to="/cars" className="btn w-72 rounded-md border-none bg-primary text-white md:w-44">
            Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
