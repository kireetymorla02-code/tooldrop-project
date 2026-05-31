import { apiGet, apiPost } from "./api";

export async function fetchCenterDashboard(token) {
  return apiGet("/center/dashboard", token);
}

export async function fetchCenterOrders(token, status) {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiGet(`/center/orders${q}`, token);
}

export async function advanceCenterOrder(token, orderId) {
  return apiPost(`/center/orders/${orderId}/advance`, {}, token);
}

export async function uploadPartVerification(token, orderId, body) {
  return apiPost(`/center/orders/${orderId}/parts`, body, token);
}
