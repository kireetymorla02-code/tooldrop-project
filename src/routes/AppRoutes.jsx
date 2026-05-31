import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import CurrentOrders from "../pages/admin/CurrentOrders";
import Payments from "../pages/admin/Payments";
import Reviews from "../pages/admin/Reviews";
import AiAssist from "../pages/AiAssist";
import BikeBrands from "../pages/bikes/BikeBrands";
import BikeModels from "../pages/bikes/BikeModels";
import BikeServices from "../pages/bikes/BikeServices";
import BikeTracking from "../pages/bikes/BikeTracking";
import CarBrands from "../pages/cars/CarBrands";
import CarCenters from "../pages/cars/CarCenters";
import CarModels from "../pages/cars/CarModels";
import CarPayment from "../pages/cars/CarPayment";
import CarPickup from "../pages/cars/CarPickup";
import CarServices from "../pages/cars/CarServices";
import CarTracking from "../pages/cars/CarTracking";
import Dashboard from "../pages/Dashboard";
import Electronics from "../pages/electronics/Electronics";
import ElectronicsBrands from "../pages/electronics/ElectronicsBrands";
import ElectronicsServices from "../pages/electronics/ElectronicsServices";
import ElectronicsTracking from "../pages/electronics/ElectronicsTracking";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import OTP from "../pages/OTP";
import History from "../pages/orders/History";
import Orders from "../pages/orders/Orders";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/Settings";
import Splash from "../pages/Splash";
import Welcome from "../pages/Welcome";

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/splash" replace />;
  if (roles && !roles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/app/home"} replace />;
  }
  return children;
}

function AuthGuestRoute({ children }) {
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={role === "admin" ? "/admin" : "/app/home"} replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/splash" replace />} />

            <Route element={<AuthLayout />}>
              <Route path="/splash" element={<AuthGuestRoute><Splash /></AuthGuestRoute>} />
              <Route path="/login" element={<AuthGuestRoute><Login /></AuthGuestRoute>} />
              <Route path="/otp" element={<AuthGuestRoute><OTP /></AuthGuestRoute>} />
              <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
            </Route>

            <Route
              path="/app"
              element={
                <ProtectedRoute roles={["user"]}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="cars" element={<CarBrands />} />
              <Route path="cars/:brand" element={<CarModels />} />
              <Route path="cars/:brand/services" element={<CarServices />} />
              <Route path="cars/:brand/centers" element={<CarCenters />} />
              <Route path="cars/:brand/pickup" element={<CarPickup />} />
              <Route path="cars/:brand/payment" element={<CarPayment />} />
              <Route path="cars/tracking" element={<CarTracking />} />
              <Route path="bikes" element={<BikeBrands />} />
              <Route path="bikes/:brand" element={<BikeModels />} />
              <Route path="bikes/:brand/services" element={<BikeServices />} />
              <Route path="bikes/tracking" element={<BikeTracking />} />
              <Route path="electronics" element={<Electronics />} />
              <Route path="electronics/brands" element={<ElectronicsBrands />} />
              <Route path="electronics/services" element={<ElectronicsServices />} />
              <Route path="electronics/tracking" element={<ElectronicsTracking />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/history" element={<History />} />
              <Route path="profile" element={<Profile />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="ai-assist" element={<AiAssist />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<CurrentOrders />} />
              <Route path="payments" element={<Payments />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>

            <Route path="*" element={<Navigate to="/splash" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
