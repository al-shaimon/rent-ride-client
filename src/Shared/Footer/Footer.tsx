import { Link } from 'react-router-dom';
// import { useAppSelector } from '../../redux/hooks';
import { FaFacebook, FaGithub, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  // const currentTheme = useAppSelector((state) => state.theme.currentTheme);

  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link to="/about-us" className="link link-hover">
            About us
          </Link>
          <Link to="/contact-us" className="link link-hover">
            Contact
          </Link>
          <Link to="/booking" className="link link-hover">
            Booking
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms-of-service" className="link link-hover">
            Terms of service
          </Link>
          <Link to="/privacy-policy" className="link link-hover">
            Privacy policy
          </Link>
          <Link to="/cookie-policy" className="link link-hover">
            Cookie policy
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a href="mailto:support@rentrider.com">
            Email: <span className="link link-hover">support@rentrider.com</span>
          </a>
          <a href="tel:+1234567890">
            Phone: <span className="link link-hover">+1 234 567 890</span>
          </a>
          <p>Address: 123 RentRide St, City, State, 12345</p>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-row md:grid-flow-col items-center">
          <img
            className="w-44"
            // src={currentTheme === 'light' ? '/logo.webp' : '/logo-dark.webp'}
            src="/logo-blue.webp"
            alt="logo"
          />
          <p>
            RentRide Industries Ltd.
            <br />
            Providing reliable car rental service since 1992
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/al_shaimon" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={24} />
            </a>
            <a href="https://github.com/al-shaimon" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>

            <a href="http://facebook.com/al.shaimon" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
