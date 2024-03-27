import React from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
}

export default ProtectedRoute;
