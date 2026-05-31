import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import LocationGuard from "../components/LocationGuard";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PageTransition from "../components/PageTransition";

export default function MainLayout() {
  const location = useLocation();
  const isLocationPage = location.pathname === "/app/location";

  return (
    <div className="main-layout">
      {!isLocationPage && <Sidebar />}
      <div className="main-content">
        {!isLocationPage && <Topbar />}
        <main className="main-page">
          <LocationGuard>
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </LocationGuard>
        </main>
      </div>
    </div>
  );
}
