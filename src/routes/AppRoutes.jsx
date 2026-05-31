import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import { getHomeRoute, ROLES } from "../constants/roles";
import { AuthProvider, useAuth } from "../context/AuthProvider";
import { CustomerProvider } from "../context/CustomerProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import CenterAdminLayout from "../layouts/CenterAdminLayout";
import MainLayout from "../layouts/MainLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import CurrentOrders from "../pages/admin/CurrentOrders";
import Payments from "../pages/admin/Payments";
import Reviews from "../pages/admin/Reviews";
import AiAssist from "../pages/AiAssist";
import BikeBrands from "../pages/bikes/BikeBrands";
import BikeCenters from "../pages/bikes/BikeCenters";
import BikeModels from "../pages/bikes/BikeModels";
import BikePayment from "../pages/bikes/BikePayment";
import BikePickup from "../pages/bikes/BikePickup";
import BikeServices from "../pages/bikes/BikeServices";
import CenterDashboard from "../pages/center/CenterDashboard";
import CenterMechanics from "../pages/center/CenterMechanics";
import CenterOrders from "../pages/center/CenterOrders";
import CenterPartVerification from "../pages/center/CenterPartVerification";
import CenterPickups from "../pages/center/CenterPickups";
import CarBrands from "../pages/cars/CarBrands";
import CarCenters from "../pages/cars/CarCenters";
import CarModels from "../pages/cars/CarModels";
import CarPayment from "../pages/cars/CarPayment";
import CarPickup from "../pages/cars/CarPickup";
import CarServices from "../pages/cars/CarServices";
import Dashboard from "../pages/Dashboard";
import Electronics from "../pages/electronics/Electronics";
import ElectronicsCenters from "../pages/electronics/ElectronicsCenters";
import ElectronicsPayment from "../pages/electronics/ElectronicsPayment";
import ElectronicsPickup from "../pages/electronics/ElectronicsPickup";
import ElectronicsServices from "../pages/electronics/ElectronicsServices";
import Emergency from "../pages/Emergency";
import FAQ from "../pages/FAQ";
import Favorites from "../pages/Favorites";
import LocationSetup from "../pages/LocationSetup";
import Login from "../pages/Login";
import Notifications from "../pages/Notifications";
import OTP from "../pages/OTP";
import History from "../pages/orders/History";
import Orders from "../pages/orders/Orders";
import OrderTracking from "../pages/orders/OrderTracking";
import Profile from "../pages/profile/Profile";
import ProfileSetup from "../pages/profile/ProfileSetup";
import Rewards from "../pages/Rewards";
import Settings from "../pages/Settings";
import Splash from "../pages/Splash";
import Support from "../pages/Support";
import Welcome from "../pages/Welcome";

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, role, bootstrapping } = useAuth();

  if (bootstrapping) {
    return <Loader label="Restoring session…" />;
  }

  if (!isAuthenticated) return <Navigate to="/splash" replace />;

  if (roles && !roles.includes(role)) {
    return <Navigate to={getHomeRoute(role)} replace />;
  }

  return children;
}

function AuthGuestRoute({ children }) {
  const { isAuthenticated, role, bootstrapping } = useAuth();

  if (bootstrapping) {
    return <Loader label="Loading…" />;
  }

  if (isAuthenticated) {
    return <Navigate to={getHomeRoute(role)} replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CustomerProvider>
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
                path="/profile/setup"
                element={
                  <ProtectedRoute>
                    <div className="main-page" style={{ minHeight: "100vh", padding: 28 }}>
                      <ProfileSetup />
                    </div>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/app"
                element={
                  <ProtectedRoute roles={[ROLES.CUSTOMER]}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="location" element={<LocationSetup />} />

                <Route path="cars" element={<CarBrands />} />
                <Route path="cars/:brand" element={<CarModels />} />
                <Route path="cars/:brand/:model/services" element={<CarServices />} />
                <Route path="cars/:brand/:model/centers" element={<CarCenters />} />
                <Route path="cars/:brand/:model/pickup" element={<CarPickup />} />
                <Route path="cars/:brand/:model/payment" element={<CarPayment />} />

                <Route path="bikes" element={<BikeBrands />} />
                <Route path="bikes/:brand" element={<BikeModels />} />
                <Route path="bikes/:brand/:model/services" element={<BikeServices />} />
                <Route path="bikes/:brand/:model/centers" element={<BikeCenters />} />
                <Route path="bikes/:brand/:model/pickup" element={<BikePickup />} />
                <Route path="bikes/:brand/:model/payment" element={<BikePayment />} />

                <Route path="electronics" element={<Electronics />} />
                <Route path="electronics/:category/services" element={<ElectronicsServices />} />
                <Route path="electronics/:category/centers" element={<ElectronicsCenters />} />
                <Route path="electronics/:category/pickup" element={<ElectronicsPickup />} />
                <Route path="electronics/:category/payment" element={<ElectronicsPayment />} />

                <Route path="orders" element={<Orders />} />
                <Route path="orders/history" element={<History />} />
                <Route path="orders/:orderId/track" element={<OrderTracking />} />

                <Route path="notifications" element={<Notifications />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="emergency" element={<Emergency />} />
                <Route path="ai-assist" element={<AiAssist />} />
                <Route path="support" element={<Support />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="profile" element={<Profile />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route
                path="/center"
                element={
                  <ProtectedRoute roles={[ROLES.CENTER_ADMIN]}>
                    <CenterAdminLayout />
                  </ProtectedRoute>
                }
              >
              <Route index element={<CenterDashboard />} />
              <Route path="orders" element={<CenterOrders />} />
              <Route path="orders/:orderId/parts" element={<CenterPartVerification />} />
              <Route path="pickups" element={<CenterPickups />} />
              <Route path="mechanics" element={<CenterMechanics />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={[ROLES.SUPER_ADMIN]}>
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
        </CustomerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
