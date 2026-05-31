import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ORDER_TRACKING_STEPS, PICKUP_FEE } from "../data/cars";
import { getNearbyCenters } from "../data/centers";
import { getAiRecommendations } from "../utils/recommendationEngine";
import {
  clearCustomerStorage,
  CUSTOMER_STORAGE_KEY,
  EMPTY_CUSTOMER_STATE,
  loadCustomerStorage,
  saveCustomerStorage,
} from "../utils/customerStorage";
import { useAuth } from "./AuthProvider";
import {
  createOrderApi,
  fetchNotifications,
  fetchOrders,
  markAllNotificationsReadApi,
  markNotificationReadApi,
} from "../services/orderService";

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const saved = loadCustomerStorage();

  const [location, setLocationState] = useState(saved?.location || null);
  const [vehicles, setVehicles] = useState(saved?.vehicles || []);
  const [devices, setDevices] = useState(saved?.devices || []);
  const [favorites, setFavorites] = useState(saved?.favorites || []);
  const [notifications, setNotifications] = useState(saved?.notifications || []);
  const [orders, setOrders] = useState(saved?.orders || []);
  const [orderHistory, setOrderHistory] = useState(saved?.orderHistory || []);
  const [loyaltyPoints, setLoyaltyPoints] = useState(saved?.loyaltyPoints ?? 0);
  const [activeBooking, setActiveBooking] = useState(saved?.activeBooking || null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");

  const resetLocalState = useCallback(() => {
    setLocationState(null);
    setVehicles([]);
    setDevices([]);
    setFavorites([]);
    setNotifications([]);
    setOrders([]);
    setOrderHistory([]);
    setLoyaltyPoints(0);
    setActiveBooking(null);
    clearCustomerStorage();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      resetLocalState();
    }
  }, [isAuthenticated, resetLocalState]);

  const syncFromApi = useCallback(async () => {
    if (!token) return;
    setSyncing(true);
    setSyncError("");
    try {
      const [apiOrders, apiHistory, apiNotifications] = await Promise.all([
        fetchOrders(token),
        fetchOrders(token, { history: true }),
        fetchNotifications(token),
      ]);
      setOrders(apiOrders);
      setOrderHistory(apiHistory);
      setNotifications(apiNotifications);
    } catch (err) {
      setSyncError(err.message || "Could not sync with server");
    } finally {
      setSyncing(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      syncFromApi();
    }
  }, [isAuthenticated, token, syncFromApi]);

  useEffect(() => {
    if (!isAuthenticated) return;
    saveCustomerStorage({
      location,
      vehicles,
      devices,
      favorites,
      notifications,
      orders,
      orderHistory,
      loyaltyPoints,
      activeBooking,
    });
  }, [isAuthenticated, location, vehicles, devices, favorites, notifications, orders, orderHistory, loyaltyPoints, activeBooking]);

  const setLocation = useCallback((loc) => setLocationState(loc), []);
  const hasLocation = Boolean(location?.city || location?.label);

  const nearbyCenters = useMemo(
    () => getNearbyCenters(location?.city || "Hyderabad"),
    [location]
  );

  const aiRecommendations = useMemo(
    () => getAiRecommendations(nearbyCenters, 3),
    [nearbyCenters]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = useCallback(
    async (id) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      if (token) {
        try {
          await markNotificationReadApi(token, id);
        } catch {
          /* ignore */
        }
      }
    },
    [token]
  );

  const markAllRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (token) {
      try {
        await markAllNotificationsReadApi(token);
      } catch {
        /* ignore */
      }
    }
  }, [token]);

  const toggleFavorite = useCallback((centerId) => {
    setFavorites((prev) =>
      prev.includes(centerId) ? prev.filter((id) => id !== centerId) : [...prev, centerId]
    );
  }, []);

  const addVehicle = useCallback((vehicle) => {
    setVehicles((prev) => [...prev, { ...vehicle, id: `v-${Date.now()}` }]);
  }, []);

  const addDevice = useCallback((device) => {
    setDevices((prev) => [...prev, { ...device, id: `d-${Date.now()}` }]);
  }, []);

  const startBooking = useCallback((booking) => {
    setActiveBooking(booking);
  }, []);

  const createOrder = useCallback(
    async (bookingDetails) => {
      if (!activeBooking?.center && !bookingDetails.center) {
        throw new Error("Please select a service center before payment");
      }
      if (!activeBooking?.pickup?.address && !bookingDetails.pickup?.address) {
        throw new Error("Please complete pickup details before payment");
      }

      const payload = {
        ...bookingDetails,
        ...activeBooking,
        service: bookingDetails.service || activeBooking?.service?.name,
        center: activeBooking?.center || bookingDetails.center,
        pickup: activeBooking?.pickup || bookingDetails.pickup,
        pickupFeePaid: PICKUP_FEE,
      };

      if (!token) {
        throw new Error("Please sign in to complete your booking");
      }

      const order = await createOrderApi(token, payload);
      setOrders((prev) => [order, ...prev]);
      setActiveBooking(null);
      setLoyaltyPoints((p) => p + 50);
      await syncFromApi();
      return order;
    },
    [token, activeBooking, syncFromApi]
  );

  const value = useMemo(
    () => ({
      location,
      hasLocation,
      setLocation,
      vehicles,
      devices,
      addVehicle,
      addDevice,
      favorites,
      toggleFavorite,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllRead,
      orders,
      orderHistory,
      loyaltyPoints,
      activeBooking,
      startBooking,
      createOrder,
      syncFromApi,
      syncing,
      syncError,
      nearbyCenters,
      aiRecommendations,
      globalSearch,
      setGlobalSearch,
      trackingSteps: ORDER_TRACKING_STEPS,
      pickupFee: PICKUP_FEE,
    }),
    [
      location,
      hasLocation,
      vehicles,
      devices,
      favorites,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllRead,
      orders,
      orderHistory,
      loyaltyPoints,
      activeBooking,
      startBooking,
      createOrder,
      syncFromApi,
      syncing,
      syncError,
      nearbyCenters,
      aiRecommendations,
      globalSearch,
    ]
  );

  return (
    <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}

export { CUSTOMER_STORAGE_KEY, clearCustomerStorage, EMPTY_CUSTOMER_STATE };
