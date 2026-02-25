// import path from "path";
// import { createServer } from "./index";
// import * as express from "express";

// const app = createServer();
// const port = process.env.PORT || 3000;

// // In production, serve the built SPA files
// const __dirname = import.meta.dirname;
// const distPath = path.join(__dirname, "../spa");

// // Serve static files
// app.use(express.static(distPath));

// // Handle React Router - serve index.html for all non-API routes
// app.get("*", (req, res) => {
//   // Don't serve index.html for API routes
//   if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
//     return res.status(404).json({ error: "API endpoint not found" });
//   }

//   res.sendFile(path.join(distPath, "index.html"));
// });

// app.listen(port, () => {
//   console.log(`🚀 Fusion Starter server running on port ${port}`);
//   console.log(`📱 Frontend: http://localhost:${port}`);
//   console.log(`🔧 API: http://localhost:${port}/api`);
// });

// // Graceful shutdown
// process.on("SIGTERM", () => {
//   console.log("🛑 Received SIGTERM, shutting down gracefully");
//   process.exit(0);
// });

// process.on("SIGINT", () => {
//   console.log("🛑 Received SIGINT, shutting down gracefully");
//   process.exit(0);
// });


import "dotenv/config";
import { createServer } from "./index";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    // 1️⃣ Connect MongoDB
    await connectDatabase();

    // 2️⃣ Create Express app
    const app = createServer();

    // 3️⃣ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
}

startServer();