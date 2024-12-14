import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// Define the testimonial interface
interface Testimonial {
  id: number;
  image: string;
  rating: string | number;
  comment: string;
  name: string;
  location: string;
}

// Testimonial data
const testimonialData: Testimonial[] = [
  {
    id: 1,
    image: "/user1.webp",
    rating: "5.0",
    comment:
      "I feel very secure when using RentRide's services. Your customer care team is too good and the driver is always on time.",
    name: "Charlie Johnson",
    location: "Dhaka, BD",
  },
  {
    id: 2,
    image: "/user2.webp",
    rating: "5.0",
    comment:
      "Exceptional service every time! The cars are always clean, and the staff is incredibly helpful. Highly recommend!",
    name: "Sarah Lee",
    location: "Chittagong, BD",
  },
  {
    id: 3,
    image: "/user3.webp",
    rating: "5.0",
    comment:
      "Booking was a breeze, and the car was in perfect condition. The customer service made the whole experience seamless.",
    name: "Michael Smith",
    location: "Dhaka, BD",
  },
  {
    id: 4,
    image: "/user4.webp",
    rating: "5.0",
    comment:
      "Top-notch service with reliable vehicles. The team went above and beyond to ensure everything was perfect!",
    name: "Emily Davis",
    location: "Rajshahi, BD",
  },
  {
    id: 5,
    image: "/user5.webp",
    rating: "5.0",
    comment:
      "Fantastic experience from start to finish! The process was quick, and the car was exactly what I needed.",
    name: "James Taylor",
    location: "Sylhet, BD",
  },
];

const Testimonials = () => {
  // Reusable testimonial card component
  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="shadow-3xl mx-auto my-2 flex h-[300px] transform gap-3 rounded-3xl shadow-lg transition-transform hover:scale-105 md:max-w-[700px] lg:max-w-[920px] lg:gap-5">
      <div className="">
        <img
          className="h-[300px] rounded-l-3xl"
          src={testimonial.image}
          alt={testimonial.name}
        />
      </div>

      <div className="my-2 h-[300px] w-[50%]">
        <p className="text-3xl font-medium">
          {testimonial.rating}
          <span className="text-lg md:text-xl">stars</span>
        </p>
        <div className="rating rating-xs lg:rating-sm">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name={`rating-${testimonial.id}`}
              className="mask mask-star-2 bg-orange-400"
              disabled
              defaultChecked={index === 4}
            />
          ))}
        </div>
        <p className="my-2 text-xs text-[#282828] dark:text-slate-400 md:text-lg">
          {testimonial.comment}
        </p>
        <p className="font-medium md:text-xl md:font-semibold">
          {testimonial.name}
        </p>
        <p className="text-xs text-[#838383] dark:text-slate-400 md:text-sm">
          {testimonial.location}
        </p>
      </div>
    </div>
  );

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
      <div className="block lg:hidden">
        <Swiper
          className="mySwiper"
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
        >
          {testimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Large screen */}
      <div className="hidden lg:block">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: null,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
