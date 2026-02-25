// import "dotenv/config";
// import mongoose from "mongoose";
// import express from "express";
// import cors from "cors";
// import { handleDemo } from "./routes/demo";
// import { handleRegister, handleLogin, handleProfile, handleUploadPhoto } from "./routes/auth";
// import {
//   handleGetProjects,
//   handleGetProject,
//   handleCreateProject,
//   handleUpdateProject,
//   handleViewProject,
//   handleRateProject,
//   handleFacultyValidation,
//   handleGetProjectStats,
//   handleGetAvailableYears
// } from "./routes/projects";

// export function createServer() {
//   const app = express();
  


//   // Middleware
//   // app.use(cors());
//   app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Example API routes
//   app.get("/api/ping", (_req, res) => {
//     const ping = process.env.PING_MESSAGE ?? "ping";
//     res.json({ message: ping });
//   });

//   app.get("/api/demo", handleDemo);

//   // Authentication routes
//   app.post("/api/auth/register", handleRegister);
//   app.post("/api/auth/login", handleLogin);
//   app.get("/api/auth/profile", handleProfile);
//   app.post("/api/auth/upload-photo", handleUploadPhoto);

//   // Projects routes
//   app.get("/api/projects", handleGetProjects);
//   app.get("/api/projects/stats", handleGetProjectStats);
//   app.get("/api/projects/years", handleGetAvailableYears);
//   app.get("/api/projects/:id", handleGetProject);
//   app.post("/api/projects", handleCreateProject);
//   app.put("/api/projects/:id", handleUpdateProject);
//   app.post("/api/projects/:id/view", handleViewProject);
//   app.post("/api/projects/:id/rate", handleRateProject);
//   app.post("/api/projects/:id/faculty-validation", handleFacultyValidation);

//   return app;
// }


import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { handleDemo } from "./routes/demo";
import {
  handleRegister,
  handleLogin,
  handleProfile,
  handleUploadPhoto,
} from "./routes/auth";

import {
  handleGetProjects,
  handleGetProject,
  handleCreateProject,
  handleUpdateProject,
  handleViewProject,
  handleRateProject,
  handleFacultyValidation,
  handleGetProjectStats,
  handleGetAvailableYears,
} from "./routes/projects";

/* =========================
   🔹 MongoDB Connection
========================= */

const MONGODB_URI = process.env.MONGODB_URI as string;

async function connectDatabase() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI not found in .env file");
    }

    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
}

// Connect immediately (important for Vite dev mode)
connectDatabase();

/* =========================
   🔹 Create Express Server
========================= */

export function createServer() {
  const app = express();

  /* =========================
     🔹 Middleware
  ========================= */

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:8080",
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* =========================
     🔹 Health Check
  ========================= */

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  /* =========================
     🔹 Auth Routes
  ========================= */

  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/profile", handleProfile);
  app.post("/api/auth/upload-photo", handleUploadPhoto);

  /* =========================
     🔹 Project Routes
  ========================= */

  app.get("/api/projects", handleGetProjects);
  app.get("/api/projects/stats", handleGetProjectStats);
  app.get("/api/projects/years", handleGetAvailableYears);
  app.get("/api/projects/:id", handleGetProject);
  app.post("/api/projects", handleCreateProject);
  app.put("/api/projects/:id", handleUpdateProject);
  app.post("/api/projects/:id/view", handleViewProject);
  app.post("/api/projects/:id/rate", handleRateProject);
  app.post("/api/projects/:id/faculty-validation", handleFacultyValidation);

  return app;
}