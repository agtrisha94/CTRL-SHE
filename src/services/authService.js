const API_BASE_URL = "https://ctrl-she.onrender.com"; // change for prod

// ---------------- TOKEN HELPERS ----------------

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

// ---------------- API CALLS ----------------

// REGISTER
export const registerUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  setToken(data.access_token);

  return data;
};

// LOGIN
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  setToken(data.access_token);

  return {
    accessToken: data.access_token,
    profileCompleted: data.profileCompleted,
    user: data.user,
  };
};


// LOGOUT
export const logoutUser = () => {
  removeToken();
};
