import { signInWithGoogle } from "../firebase/firebase";
import { apiPost, apiPut, apiGet } from "./api";

export async function sendOtp({ phone, email, role }) {
  return apiPost("/auth/send-otp", { phone, email, role });
}

export async function verifyOtp({ phone, email, otp, role }) {
  return apiPost("/auth/verify-otp", { phone, email, otp, role });
}

export async function loginWithGoogle(role) {
  const user = await signInWithGoogle();
  return apiPost("/auth/google", {
    firebaseUid: user.uid,
    email: user.email,
    name: user.displayName,
    profileImage: user.photoURL,
    role,
  });
}

export async function fetchCurrentUser(token) {
  return apiGet("/users/me", token);
}

export async function updateUserProfile(token, profile) {
  return apiPut("/users/me/profile", profile, token);
}
