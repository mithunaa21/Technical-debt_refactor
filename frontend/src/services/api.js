import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

export const analyzeCode = (code) =>
  API.post("/api/analyze", { code });
