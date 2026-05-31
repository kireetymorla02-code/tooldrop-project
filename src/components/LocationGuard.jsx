import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCustomer } from "../context/CustomerProvider";

export default function LocationGuard({ children }) {
  const { hasLocation } = useCustomer();
  const location = useLocation();

  if (!hasLocation && location.pathname !== "/app/location") {
    return <Navigate to="/app/location" replace />;
  }

  return children || <Outlet />;
}
