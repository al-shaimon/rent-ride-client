import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Booking from '../pages/Booking/Booking';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import Login from '../Shared/Auth/Login';
import Signup from '../Shared/Auth/Signup';
import TermsOfService from '../Shared/Policies/TermsOfService';
import PrivacyPolicy from '../Shared/Policies/PrivacyPolicy';
import CookiePolicy from '../Shared/Policies/CookiePolicy';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/booking',
        element: <Booking />,
      },
      {
        path: '/contact-us',
        element: <Contact />,
      },
      {
        path: '/about-us',
        element: <About />,
      },
      {
        path: '/terms-of-service',
        element: <TermsOfService />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/cookie-policy',
        element: <CookiePolicy />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);
