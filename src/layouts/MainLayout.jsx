import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PageTransition from "../components/PageTransition";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="main-page">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
