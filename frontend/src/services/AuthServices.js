import api from "../lib/api";


export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const user = response.data.data?.user || response.data.user;
  const token = response.data.data?.token || response.data.token;

  if (!user || !token) {
    throw new Error("Invalid login response");
  }

  return { user, token };
};


export const registerUser = async ({ name, email, password }) => {
  const response = await api.post("/auth/register", { name, email, password });
  const user = response.data.data?.user || response.data.user;
  const token = response.data.data?.token || response.data.token;

  if (!user || !token) {
    throw new Error("Invalid registration response");
  }

  return { user, token };
};
