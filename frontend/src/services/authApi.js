import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);

export const signupUser = (data) =>
  axios.post(`${API}/signup`, data);
