import "dotenv/config";
import express from "express";
import cors from "cors";

import { initializeDatabase } from "./config/db.js";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API is running 🚀",
  });
});

app.use("/", schoolRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed:", error.message);
  }
}

startServer();