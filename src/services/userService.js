import { getToken } from "./authService";

const API_BASE_URL = "https://ctrl-she.onrender.com";

// COMPLETE PROFILE
export const completeProfile = async (profileData) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/users/complete-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Profile completion failed");
  }

  return data;
};

// ✅ FETCH USER PROFILE
export const fetchUserProfile = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};
