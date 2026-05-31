import { isFirebaseConfigured } from "../firebase/firebase";

export default function GoogleSignInButton({ onClick, loading, disabled }) {
  if (!isFirebaseConfigured) return null;

  return (
    <button
      type="button"
      className="google-btn"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Signing in…" : "Continue with Google"}
    </button>
  );
}
