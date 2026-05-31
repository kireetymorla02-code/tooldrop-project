import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import AuthVideo from "../components/AuthVideo";
import PageTransition from "../components/PageTransition";

export default function AuthLayout() {
  const location = useLocation();

  return (
    <>
      <AuthVideo />
      <div className="auth-content">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
    </>
  );
}
