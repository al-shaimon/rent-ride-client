import Banner from "./Banner";
import Popular from "./Popular";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="mx-2">
      <Banner />
      <Popular />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
