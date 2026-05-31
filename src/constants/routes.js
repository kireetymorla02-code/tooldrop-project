import { ROLES, getHomeRoute } from "./roles";

export { ROLES, ROLE_LABELS, getHomeRoute, getProfileRoute, normalizeLegacyRole } from "./roles";

export function getCustomerLandingRoute(profileComplete, hasLocation) {
  if (!profileComplete) return "/profile/setup";
  if (!hasLocation) return "/app/location";
  return "/app/home";
}

export function getPostAuthRoute(role, profileComplete, hasLocation) {
  if (role === ROLES.SUPER_ADMIN) return "/admin";
  if (role === ROLES.CENTER_ADMIN) return "/center";
  return getCustomerLandingRoute(profileComplete, hasLocation);
}
