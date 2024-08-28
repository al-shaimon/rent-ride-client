import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiMapPin } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineCalendarMonth } from "react-icons/md";

const Banner = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  console.log(startDate, endDate);

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
            <button className="btn flex w-36 items-center gap-2 rounded-md border-none bg-primary text-white">
              Book Now <GoArrowRight size={24} />
            </button>
          </div>
        </div>
        <div>
          <img src="/car.png" alt="car" />
        </div>
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-rows-1 gap-5 rounded-box bg-base-100 py-5 shadow-2xl md:grid-cols-2 md:justify-around lg:grid-cols-4">
        <div className="mx-auto flex w-[300px] items-center justify-center gap-2">
          <FiMapPin size={32} />
          <div>
            <p className="font-bold">Location</p>
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="m-1">
                Search your location
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a>Barishal</a>
                </li>
                <li>
                  <a>Chittagong</a>
                </li>
                <li>
                  <a>Dhaka</a>
                </li>
                <li>
                  <a>Khulna</a>
                </li>
                <li>
                  <a>Rajshahi</a>
                </li>
                <li>
                  <a>Rangpur</a>
                </li>
                <li>
                  <a>Mymensingh </a>
                </li>
                <li>
                  <a>Sylhet</a>
                </li>
              </ul>
            </div>
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
                if (date && date > endDate) {
                  setEndDate(date);
                }
              }}
              className="bg-base-100"
            />
          </div>
        </div>
        <div className="mx-auto flex w-[320px] items-center justify-end gap-2">
          <MdOutlineCalendarMonth size={32} />
          <div>
            <p className="font-bold">Return Date</p>
            <DatePicker
              selected={endDate}
              dateFormat="dd/MM/yyyy"
              minDate={startDate}
              onChange={(date) => setEndDate(date as Date)}
              className="bg-base-100"
            />
          </div>
        </div>
        <div className="mx-auto flex items-center">
          <button className="btn w-72 rounded-md border-none bg-primary text-white md:w-44">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
