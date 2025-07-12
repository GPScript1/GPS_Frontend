// src/lib/axios.ts
import axios from 'axios';

const ApiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/", // fallback local
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*",
  },
  withCredentials: false, // Cambia a true si usas cookies (de momento no necesario)
});

ApiBackend.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { ApiBackend };
