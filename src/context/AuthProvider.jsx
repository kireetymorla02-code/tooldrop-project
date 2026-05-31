import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SESSION_STORAGE_KEY } from "../constants/auth";
import { getHomeRoute, normalizeLegacyRole, ROLES } from "../constants/roles";
import { fetchCurrentUser } from "../services/authService";
import { clearCustomerStorage } from "../utils/customerStorage";

const AuthContext = createContext(null);

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  if (session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function AuthProvider({ children }) {
  const saved = loadSession();
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(saved?.token));
  const [token, setToken] = useState(saved?.token || "");
  const [user, setUser] = useState(saved?.user || null);
  const [role, setRole] = useState(
    normalizeLegacyRole(saved?.user?.role || saved?.role || ROLES.CUSTOMER)
  );
  const [phone, setPhone] = useState(saved?.user?.phone || saved?.phone || "");
  const [email, setEmail] = useState(saved?.user?.email || saved?.email || "");
  const [loginMethod, setLoginMethod] = useState("phone");
  const [videoFading, setVideoFading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(Boolean(saved?.token));

  useEffect(() => {
    if (!token) {
      setBootstrapping(false);
      return;
    }

    fetchCurrentUser(token)
      .then(({ user: freshUser }) => {
        setUser(freshUser);
        setRole(normalizeLegacyRole(freshUser.role));
        setPhone(freshUser.phone || "");
        setEmail(freshUser.email || "");
        setIsAuthenticated(true);
        saveSession({ token, user: freshUser });
      })
      .catch(() => {
        logout();
      })
      .finally(() => setBootstrapping(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const establishSession = useCallback(({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser);
    setRole(normalizeLegacyRole(nextUser.role));
    setPhone(nextUser.phone || "");
    setEmail(nextUser.email || "");
    setIsAuthenticated(true);
    saveSession({ token: nextToken, user: nextUser });
  }, []);

  const login = useCallback(({ role: nextRole, phone: nextPhone, email: nextEmail, method }) => {
    setRole(normalizeLegacyRole(nextRole || ROLES.CUSTOMER));
    if (nextPhone) setPhone(nextPhone);
    if (nextEmail) setEmail(nextEmail);
    if (method) setLoginMethod(method);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setToken("");
    setUser(null);
    setRole(ROLES.CUSTOMER);
    setPhone("");
    setEmail("");
    setVideoFading(false);
    saveSession(null);
    clearCustomerStorage();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      bootstrapping,
      token,
      user,
      role,
      phone,
      email,
      loginMethod,
      videoFading,
      profileComplete: user?.profile_complete ?? false,
      setRole,
      setPhone,
      setEmail,
      setLoginMethod,
      setVideoFading,
      login,
      establishSession,
      logout,
      homeRoute: getHomeRoute(role),
    }),
    [
      isAuthenticated,
      bootstrapping,
      token,
      user,
      role,
      phone,
      email,
      loginMethod,
      videoFading,
      login,
      establishSession,
      logout,
    ]
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
