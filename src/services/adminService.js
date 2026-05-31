import { apiGet } from "./api";

export async function fetchAdminStats(token) {
  return apiGet("/admin/stats", token);
}

export async function fetchAdminOrders(token) {
  const data = await apiGet("/admin/orders", token);
  return data.orders || [];
}

export async function fetchAdminPayments(token) {
  const data = await apiGet("/admin/payments", token);
  return data.payments || [];
}
