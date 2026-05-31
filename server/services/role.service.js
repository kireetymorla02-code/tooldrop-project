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

module.exports = { sanitizeRole, resolveRoleForNewUser, ALLOWED_ROLES };
