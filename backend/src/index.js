import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import justificatifRoutes from "./routes/justificatif.route.js";
import vehiculeRoutes from "./routes/vehicule.route.js";
import trajetRoutes from "./routes/trajet.route.js";


import { connectDB } from "./lib/db.js";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 }, // 10 minutes
  })
);
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/justificatif", justificatifRoutes);
app.use("/api/vehicule", vehiculeRoutes);
app.use("/api/trajet", trajetRoutes);


app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
  connectDB();
});
