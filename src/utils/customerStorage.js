export const CUSTOMER_STORAGE_KEY = "tooldrop_customer";

export function clearCustomerStorage() {
  localStorage.removeItem(CUSTOMER_STORAGE_KEY);
}

export function loadCustomerStorage() {
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCustomerStorage(state) {
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(state));
}

export const EMPTY_CUSTOMER_STATE = {
  location: null,
  vehicles: [],
  devices: [],
  favorites: [],
  notifications: [],
  orders: [],
  orderHistory: [],
  loyaltyPoints: 0,
  activeBooking: null,
};
