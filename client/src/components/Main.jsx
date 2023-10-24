// import Notfound from "../components/blocks/Notfound";
import React, { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import Comments from '../pages/Comments';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedPage from './AnimatedPage';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NewOrder from '../pages/NewOrder';
import OrderDetails from '../pages/OrderDetails';
import UpdateOrder from '../pages/UpdateOrder';
import LoginForm from '../pages/LoginForm';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Dashboard from '../pages/Dashboard';
import Contact from '../pages/Contact';
import NotFound from './NotFound';

const Main = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <main>
      <AnimatedPage>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>

            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Home />}
              />
        {/* <Route path="/" element={<Home />} /> */}

            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders/new" element={<NewOrder />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/orders/:id/update" element={<UpdateOrder />} />
              {/* <Route path="/orders/:id/comments" element={<Comments />} /> */}

              {/* <Route path="/checkout" element={<Checkout />} /> */}
              {/* <Route path="/payment" element={<Payment />} /> */}
              {/* <Route path="/comments" element={<Comments />} /> */}
            </Route>

            <Route path="/login" element={<LoginForm />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </AnimatedPage>
    </main>
  );
};

export default Main;
