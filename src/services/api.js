const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const request = async (method, endpoint, body = null) => {
  const options = { method, headers: getHeaders() };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Auth
export const loginUser = (credentials) => request("POST", "/auth/login", credentials);
export const registerUser = (userData) => request("POST", "/auth/register", userData);
export const logoutUser = () => localStorage.removeItem("token");

// Gigs
export const getGigs = (params = "") => request("GET", `/gigs?${params}`);
export const getGigById = (id) => request("GET", `/gigs/${id}`);
export const createGig = (data) => request("POST", "/gigs", data);
export const applyToGig = (id, proposal) => request("POST", `/gigs/${id}/apply`, proposal);

// Freelancers
export const getFreelancers = (params = "") => request("GET", `/freelancers?${params}`);
export const getFreelancerById = (id) => request("GET", `/freelancers/${id}`);

// Profile
export const getProfile = () => request("GET", "/auth/me");
export const updateProfile = (data) => request("PUT", "/auth/profile", data);
