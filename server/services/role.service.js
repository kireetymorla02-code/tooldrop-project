const ALLOWED_ROLES = new Set(["customer", "center_admin", "super_admin"]);

function sanitizeRole(role) {
  return ALLOWED_ROLES.has(role) ? role : "customer";
}

/** In production, only allow elevated roles for contacts on the allowlist. Dev allows all. */
function resolveRoleForNewUser(requestedRole, contact) {
  const role = sanitizeRole(requestedRole);
  if (process.env.NODE_ENV !== "production") return role;

  const allowlist = (process.env.ROLE_ALLOWLIST || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (allowlist.includes(contact) || allowlist.includes(`${contact}:${role}`)) {
    return role;
  }
  if (role !== "customer") return "customer";
  return role;
}

/** Apply role chosen on login screen (honored in dev; allowlist-gated in production). */
function resolveRoleOnLogin(requestedRole, contact, existingRole) {
  const requested = sanitizeRole(requestedRole);
  if (process.env.NODE_ENV !== "production") return requested;

  const allowed = resolveRoleForNewUser(requested, contact);
  if (allowed === requested) return requested;
  return existingRole || "customer";
}

module.exports = { sanitizeRole, resolveRoleForNewUser, resolveRoleOnLogin, ALLOWED_ROLES };
