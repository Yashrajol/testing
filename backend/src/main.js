import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route handler
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "VEDHKRIT Express.js BFF Server Running",
    version: "1.0.0",
    health: "/api/v1/health",
  });
});

// Chrome DevTools probe handler
app.get("/.well-known/*", (req, res) => {
  res.status(204).end();
});

// Central API Router (/api/v1/*)
app.use("/api/v1", routes);

// Global Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 VEDHKRIT Express.js BFF Server running on http://localhost:${PORT}`);
});
