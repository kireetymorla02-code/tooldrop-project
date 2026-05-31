import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [videoFading, setVideoFading] = useState(false);

  const value = useMemo(
    () => ({
      isAuthenticated,
      role,
      phone,
      videoFading,
      setRole,
      setPhone,
      setVideoFading,
      login: ({ role: nextRole, phone: nextPhone }) => {
        setRole(nextRole || "user");
        setPhone(nextPhone || "");
      },
      completeAuth: () => setIsAuthenticated(true),
      logout: () => {
        setIsAuthenticated(false);
        setRole("user");
        setPhone("");
        setVideoFading(false);
      },
    }),
    [isAuthenticated, role, phone, videoFading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
