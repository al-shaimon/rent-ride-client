import { FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

type TeamMember = {
  name: string;
  role: string;
  photoUrl: string;
};

const teamMembers: TeamMember[] = [
  { name: "Al Shaimon", role: "CEO", photoUrl: "/shaimon.webp" },
  { name: "Mahim Arif", role: "CTO", photoUrl: "/mahim.webp" },
  {
    name: "Hamdanul Haque",
    role: "Marketing Manager",
    photoUrl: "/hamdan.webp",
  },
];

const About = () => {
  return (
    <div className="mt-3 min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-primary py-6 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </header>

      {/* Company History */}
      <section className="container mx-auto mb-12 mt-8 px-4 md:mt-12">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Company History
        </h2>
        <p className="text-lg">
          Founded in 2010, Our Company has grown from a small startup to a
          leading car rental service provider. Our mission is to provide
          reliable and convenient transportation solutions. We envision a future
          where mobility is seamless and accessible for everyone.
        </p>
      </section>

      {/* Our Team */}
      <section className="container mx-auto my-12 px-4">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Our Team
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Fleet */}
      <section className="container mx-auto my-12 px-4">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Our Fleet
        </h2>
        <p className="text-lg">
          We offer a diverse range of vehicles to meet your needs, including
          economy cars, luxury vehicles, and SUVs. Our fleet is maintained to
          the highest standards to ensure safety and comfort.
        </p>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <div className="card flex bg-base-100 p-4 shadow-xl">
            <FaCar size={40} className="mr-4 text-primary" />
            <div>
              <h4 className="text-xl font-bold">Economy Cars</h4>
              <p className="text-gray-500 dark:text-white">
                Affordable and efficient vehicles for everyday use.
              </p>
            </div>
          </div>
          <div className="card flex bg-base-100 p-4 shadow-xl">
            <FaCar size={40} className="mr-4 text-primary" />
            <div>
              <h4 className="text-xl font-bold">Luxury Cars</h4>
              <p className="text-gray-500 dark:text-white">
                Experience comfort and style with our premium options.
              </p>
            </div>
          </div>
          <div className="card flex bg-base-100 p-4 shadow-xl">
            <FaCar size={40} className="mr-4 text-primary" />
            <div>
              <h4 className="text-xl font-bold">SUVs</h4>
              <p className="text-gray-500 dark:text-white">
                Spacious and powerful vehicles for all terrains.
              </p>
            </div>
          </div>
          <div className="card flex bg-base-100 p-4 shadow-xl">
            <FaCar size={40} className="mr-4 text-primary" />
            <div>
              <h4 className="text-xl font-bold">Electric</h4>
              <p className="text-gray-500 dark:text-white">
                Environment and economy friendly electric cars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Commitment */}
      <section className="container mx-auto my-12 px-4">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Values & Commitment
        </h2>
        <p className="text-lg">
          We are committed to providing exceptional customer service and
          ensuring a positive experience for all our clients. Our dedication to
          sustainability drives us to continuously improve our practices and
          reduce our environmental impact.
        </p>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto mt-12 px-4 pb-12">
        <h2 className="mb-4 text-center text-3xl font-semibold md:text-start">
          Contact Information
        </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex items-center">
            <FaPhone size={24} className="mr-4 text-primary" />
            <p className="text-lg">+1 (123) 456-7890</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope size={24} className="mr-4 text-primary" />
            <p className="text-lg">info@company.com</p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt size={24} className="mr-4 text-primary" />
            <p className="text-lg">123 Main Street, City, Country</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
