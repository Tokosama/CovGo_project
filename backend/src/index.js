import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import cors from "cors";

import justificatifRoutes from "./routes/justificatif.route.js";
import vehiculeRoutes from "./routes/vehicule.route.js";
import trajetRoutes from "./routes/trajet.route.js";
import reservationRoutes from "./routes/reservation.route.js";
import messageRoutes from "./routes/message.route.js";
import evaluationRoutes from "./routes/evaluation.route.js";

import { connectDB } from "./lib/db.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";

dotenv.config();

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
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/justificatif", justificatifRoutes);
app.use("/api/vehicule", vehiculeRoutes);
app.use("/api/trajet", trajetRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/evaluation", evaluationRoutes);

server.listen(PORT, "0.0.0.0", () => {
  console.log("server is running on port:" + PORT);
  connectDB();
});
