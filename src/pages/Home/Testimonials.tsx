import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

const Testimonials = () => {
  return (
    <div className="my-[84px]">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-6 w-56 rounded-lg bg-[#1572D31A] py-3">
          <p className="px-2 font-semibold text-primary">TESTIMONIALS</p>
        </div>
        <h4 className="text-xl font-medium uppercase md:text-2xl lg:text-4xl">
          What people say about us?
        </h4>
      </div>
      {/* Small and medium device */}
      <div className="">
        <Swiper
          className="mySwiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
        >
          {/* User1 */}
          <SwiperSlide>
            <div className="shadow-3xl mx-auto my-2 flex h-[300px] transform gap-3 rounded-3xl shadow-lg transition-transform hover:scale-105 md:max-w-[700px] lg:max-w-[920px] lg:gap-5">
              <div className="">
                <img
                  className="h-[300px] rounded-l-3xl"
                  src="/user1.png"
                  alt="user"
                />
              </div>

              <div className="my-2 h-[300px] w-[50%] md:my-3 lg:my-5">
                <p className="text-3xl font-medium md:text-4xl lg:text-5xl">
                  5.0
                  <span className="text-lg md:text-xl lg:text-2xl">stars</span>
                </p>
                <div className="rating rating-xs lg:rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                    defaultChecked
                  />
                </div>
                <p className="my-2 text-xs text-[#282828] dark:text-slate-400 md:text-lg lg:text-xl">
                  “I feel very secure when using caretall's services. Your
                  customer care team is too good and the driver is always on
                  time.”
                </p>
                <p className="font-medium md:text-xl lg:text-2xl">
                  Charlie Johnson
                </p>
                <p className="text-xs text-[#838383] dark:text-slate-400 md:text-sm">
                  From New York, US
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* User2 */}
          <SwiperSlide>
            <div className="shadow-3xl mx-auto my-2 flex h-[300px] transform gap-3 rounded-3xl shadow-lg transition-transform hover:scale-105 md:max-w-[700px] lg:max-w-[920px] lg:gap-5">
              <div className="">
                <img
                  className="h-[300px] rounded-l-3xl"
                  src="/user2.png"
                  alt="user"
                />
              </div>

              <div className="my-2 h-[300px] w-[50%] md:my-3 lg:my-5">
                <p className="text-3xl font-medium md:text-4xl lg:text-5xl">
                  5.0
                  <span className="text-lg md:text-xl lg:text-2xl">stars</span>
                </p>
                <div className="rating rating-xs lg:rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                    defaultChecked
                  />
                </div>
                <p className="my-2 text-xs text-[#282828] dark:text-slate-400 md:text-lg lg:text-xl">
                  “Exceptional service every time! The cars are always clean,
                  and the staff is incredibly helpful. Highly recommend!”
                </p>
                <p className="font-medium md:text-xl lg:text-2xl">Sarah Lee</p>
                <p className="text-xs text-[#838383] dark:text-slate-400 md:text-sm">
                  From Los Angeles, US
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* User3 */}
          <SwiperSlide>
            <div className="shadow-3xl mx-auto my-2 flex h-[300px] transform gap-3 rounded-3xl shadow-lg transition-transform hover:scale-105 md:max-w-[700px] lg:max-w-[920px] lg:gap-5">
              <div className="">
                <img
                  className="h-[300px] rounded-l-3xl"
                  src="/user3.png"
                  alt="user"
                />
              </div>

              <div className="my-2 h-[300px] w-[50%] md:my-3 lg:my-5">
                <p className="text-3xl font-medium md:text-4xl lg:text-5xl">
                  5.0
                  <span className="text-lg md:text-xl lg:text-2xl">stars</span>
                </p>
                <div className="rating rating-xs lg:rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                    defaultChecked
                  />
                </div>
                <p className="my-2 text-xs text-[#282828] dark:text-slate-400 md:text-lg lg:text-xl">
                  “Booking was a breeze, and the car was in perfect condition.
                  The customer service made the whole experience seamless.”
                </p>
                <p className="font-medium md:text-xl lg:text-2xl">
                  Michael Smith
                </p>
                <p className="text-xs text-[#838383] dark:text-slate-400 md:text-sm">
                  From Miami, US
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* User4 */}
          <SwiperSlide>
            <div className="shadow-3xl mx-auto my-2 flex h-[300px] transform gap-3 rounded-3xl shadow-lg transition-transform hover:scale-105 md:max-w-[700px] lg:max-w-[920px] lg:gap-5">
              <div className="">
                <img
                  className="h-[300px] rounded-l-3xl"
                  src="/user4.png"
                  alt="user"
                />
              </div>

              <div className="my-2 h-[300px] w-[50%] md:my-3 lg:my-5">
                <p className="text-3xl font-medium md:text-4xl lg:text-5xl">
                  5.0
                  <span className="text-lg md:text-xl lg:text-2xl">stars</span>
                </p>
                <div className="rating rating-xs lg:rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                    defaultChecked
                  />
                </div>
                <p className="my-2 text-xs text-[#282828] dark:text-slate-400 md:text-lg lg:text-xl">
                  “Top-notch service with reliable vehicles. The team went above
                  and beyond to ensure everything was perfect!”
                </p>
                <p className="font-medium md:text-xl lg:text-2xl">
                  Emily Davis
                </p>
                <p className="text-xs text-[#838383] dark:text-slate-400 md:text-sm">
                  From Chicago, US
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* User5 */}
          <SwiperSlide>
            <div className="shadow-3xl mx-auto my-2 flex h-[300px] transform gap-3 rounded-3xl shadow-lg transition-transform hover:scale-105 md:max-w-[700px] lg:max-w-[920px] lg:gap-5">
              <div className="">
                <img
                  className="h-[300px] rounded-l-3xl"
                  src="/user5.png"
                  alt="user"
                />
              </div>

              <div className="my-2 h-[300px] w-[50%] md:my-3 lg:my-5">
                <p className="text-3xl font-medium md:text-4xl lg:text-5xl">
                  5.0
                  <span className="text-lg md:text-xl lg:text-2xl">stars</span>
                </p>
                <div className="rating rating-xs lg:rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    disabled
                    defaultChecked
                  />
                </div>
                <p className="my-2 text-xs text-[#282828] dark:text-slate-400 md:text-lg lg:text-xl">
                  “Fantastic experience from start to finish! The process was
                  quick, and the car was exactly what I needed.”
                </p>
                <p className="font-medium md:text-xl lg:text-2xl">
                  James Taylor
                </p>
                <p className="text-xs text-[#838383] dark:text-slate-400 md:text-sm">
                  From Dallas, US
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
