import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Booking from '../pages/Booking/Booking';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';

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
    ],
  },
]);
