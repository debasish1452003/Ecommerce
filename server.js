import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
