import axios from "axios";

export const analyzeCode = async (code) => {
  const res = await axios.post("http://localhost:5000/api/analyze", { code });
  return res.data;
};
