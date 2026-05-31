export const ROLES = {
  CUSTOMER: "customer",
  CENTER_ADMIN: "center_admin",
  SUPER_ADMIN: "super_admin",
};

export const ROLE_LABELS = {
  [ROLES.CUSTOMER]: "Customer",
  [ROLES.CENTER_ADMIN]: "Service Center Admin",
  [ROLES.SUPER_ADMIN]: "Super Admin",
};

export function getHomeRoute(role) {
  switch (role) {
    case ROLES.SUPER_ADMIN:
      return "/admin";
    case ROLES.CENTER_ADMIN:
      return "/center";
    case ROLES.CUSTOMER:
    default:
      return "/app/home";
  }
}

export function getProfileRoute(role, profileComplete, hasLocation) {
  if (role !== ROLES.CUSTOMER) return getHomeRoute(role);
  if (!profileComplete) return "/profile/setup";
  if (hasLocation === false) return "/app/location";
  return getHomeRoute(role);
}

/** @deprecated legacy demo roles */
export function normalizeLegacyRole(role) {
  if (role === "user") return ROLES.CUSTOMER;
  if (role === "admin") return ROLES.SUPER_ADMIN;
  return role;
}
