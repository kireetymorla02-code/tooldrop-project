import { apiGet, apiPost, apiPatch } from "./api";

export async function fetchOrders(token, { history = false } = {}) {
  const data = await apiGet(`/orders${history ? "?history=true" : ""}`, token);
  return data.orders || [];
}

export async function fetchOrder(token, orderId) {
  return apiGet(`/orders/${orderId}`, token);
}

export async function createOrderApi(token, payload) {
  const data = await apiPost("/orders", payload, token);
  return data.order;
}

export async function fetchNotifications(token) {
  const data = await apiGet("/notifications", token);
  return data.notifications || [];
}

export async function markNotificationReadApi(token, id) {
  return apiPatch(`/notifications/${id}/read`, {}, token);
}

export async function markAllNotificationsReadApi(token) {
  return apiPost("/notifications/read-all", {}, token);
}

export async function fetchPartVerifications(token, orderId) {
  const data = await apiGet(`/parts/orders/${orderId}`, token);
  return data.parts || [];
}

export async function respondToPartApi(token, verificationId, body) {
  return apiPost(`/parts/${verificationId}/respond`, body, token);
}
