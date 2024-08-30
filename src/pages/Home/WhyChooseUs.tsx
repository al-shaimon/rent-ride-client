const WhyChooseUs = () => {
  return (
    <div className="my-[84px] px-2">
      <div className="flex flex-col-reverse gap-5 lg:flex-row">
        <img src="/audi-choose-car.webp" alt="audi" />
        <div>
          <div className="mb-4 text-center">
            <div className="mx-auto mb-5 w-56 rounded-lg bg-[#1572D31A] py-3 md:mx-0">
              <p className="font-semibold uppercase text-primary">
                WHY CHOOSE US
              </p>
            </div>
            <h4 className="text-2xl md:text-start md:text-3xl lg:text-5xl">
              We offer the best experience with our rental deals
            </h4>
          </div>
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <img src="/price.svg" alt="price" />
              <div>
                <h5 className="text-xl font-medium">Best price guaranteed</h5>
                <p className="text-sm text-[#6D6D6D] dark:text-slate-400 md:text-base">
                  Find a lower price? We’ll refund you 100% of the difference.
                </p>
              </div>
            </div>
          </div>
          {/* Experience Driver */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <img src="/exp-driver.svg" alt="experience driver" />
              <div>
                <h5 className="text-xl font-medium">Experience driver</h5>
                <p className="text-sm text-[#6D6D6D] dark:text-slate-400 md:text-base">
                  Don’t have driver? Don’t worry, we have many experienced
                  driver for you.
                </p>
              </div>
            </div>
          </div>
          {/* 24 hour car delivery */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <img src="/service.svg" alt="service" />
              <div>
                <h5 className="text-xl font-medium">24 hour car delivery</h5>
                <p className="text-sm text-[#6D6D6D] dark:text-slate-400 md:text-base">
                  Book your car anytime and we will deliver it directly to you.
                </p>
              </div>
            </div>
          </div>
          {/* 24/7 tech support */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <img src="/tech-support.svg" alt="tech" />
              <div>
                <h5 className="text-xl font-medium">24/7 technical support</h5>
                <p className="text-sm text-[#6D6D6D] dark:text-slate-400 md:text-base">
                  Have a question? Contact Rentcars support any time when you
                  have problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
