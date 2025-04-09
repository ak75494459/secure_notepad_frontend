import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateCom() {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  return isAuthenticated === "true" ? <Outlet /> : <Navigate to="/" />;
}
