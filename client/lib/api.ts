// API utility for making requests to backend
const API_URL = import.meta.env.VITE_API_URL || "";

export const apiUrl = (path: string) => `${API_URL}${path}`;

export const apiFetch = async (path: string, options?: RequestInit) => {
  return fetch(apiUrl(path), options);
};
