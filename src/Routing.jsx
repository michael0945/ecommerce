import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import Landing from "./components/pages/landing/Landing";
import Cart from "./components/pages/cart/Cart";
import Orders from "./components/pages/orders/Orders";
import Payment from "./components/pages/payment/Payment";
import Auth from "./components/pages/auth/Auth";
import Results from "./components/pages/results/Results";
import ProductDetail from "./components/pages/productdetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Ox2QhCdKUnCVXLFCSivnqUIwyUqqDQn1wQqFb6Wq06icMv3qhJ5IzQUrEgqLZ3L9pgUlaJ48L0hcYYhcmuEWyEE0003Vu49sJ"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must first login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must login to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
