const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const refactorRoutes = require("./routes/refactorRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.post("/test", (req, res) => {
  res.json({ message: "Test route works" });
});
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/refactor", refactorRoutes);

app.listen(8080, () => {
  console.log("Backend running on port 8080");
});
