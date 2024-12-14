import { useForm, SubmitHandler } from "react-hook-form";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="mt-3 min-h-screen bg-base-200 pb-6">
      {/* Header */}
      <header className="bg-primary py-6 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-center text-4xl font-bold">Contact Us</h1>
        </div>
      </header>

      {/* Contact Information */}
      <section className="container mx-auto mb-12 mt-8 px-4 md:mt-12">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Get in Touch
        </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1 rounded-md bg-base-100 p-6 shadow-lg">
            <h3 className="mb-4 text-2xl font-bold">Contact Information</h3>
            <div className="mb-4 flex items-center">
              <FaPhone size={24} className="mr-4 text-primary" />
              <p className="text-lg">+1 (123) 456-7890</p>
            </div>
            <div className="mb-4 flex items-center">
              <FaEnvelope size={24} className="mr-4 text-primary" />
              <p className="text-lg">info@company.com</p>
            </div>
            <div className="mb-4 flex items-center">
              <FaMapMarkerAlt size={24} className="mr-4 text-primary" />
              <p className="text-lg">123 Main Street, City, Country</p>
            </div>
          </div>
          <div className="flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.549932429536!2d-122.41874308468018!3d37.7749292797594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d06a84f81%3A0xb6b72f8d91714aab!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1632838982128!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Company Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto my-12 px-4">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Send Us a Message
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md bg-base-100 p-6 shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="mb-2 block text-lg font-medium">
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
              rows={4}
              placeholder="Your Message"
            ></textarea>
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
          {isSubmitSuccessful && (
            <p className="mb-4 text-green-500">
              Your message has been sent successfully!
            </p>
          )}
          <button
            type="submit"
            className="btn w-full rounded-md bg-primary text-white"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
