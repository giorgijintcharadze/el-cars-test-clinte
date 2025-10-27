import { API_BASE } from "../lib/constants";

async function handleResponse(res) {
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(text);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ✅ Get current user
export async function fetchCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    credentials: "include",
  });
  return handleResponse(res);
}

// ✅ Login (server sets HttpOnly cookie)
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

// ✅ Logout (clears cookie)
export async function logoutUser() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
}

// ✅ Register
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}
