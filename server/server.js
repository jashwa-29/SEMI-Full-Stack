const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");

// Load environment variables
dotenv.config();     

// Import DB connection if needed (Target uses inline mongoose.connect)
// Import Error Handler (Target has errorMiddleware.js)
const errorHandler = require("./middleware/errorMiddleware");

// Import Socket Logic
const socketHandler = require("./socket");
const { startChatCleanupTask } = require("./utils/chatCleanup");

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.io

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://www.semi.org.in",
  "https://semi.org.in",
  "https://backend.semi.org.in",
];
   
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else { 
      try {   
        const hostname = new URL(origin).hostname;
        if (hostname === "semi.org.in" || hostname.endsWith(".semi.org.in")) {
          return callback(null, true);
        }
      } catch (err) {}
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
  
app.use(cors(corsOptions));

// --- Security Middleware ---
app.use( 
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

// --- Logging ---
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --- Body Parsers ---
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- Socket.io Initialization ---
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Run Socket Logic
socketHandler(io);

// Start Automated Chat Cleanup (Closes chats inactive > 24h)
startChatCleanupTask(io);

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ DB connected".green.bold);
  })
  .catch((err) => {
    console.error("❌ DB connection error:".red, err);
  });

// --- Health Check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    uptime: process.uptime(),
    dbStatus: mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED",
    timestamp: new Date()
  });
});

// --- Routes ---
// New features from reference
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/chat-settings", require("./routes/chatSettingRoutes"));

// Existing features  
app.use("/api/membership", require("./routes/membershipRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/templates", require("./routes/emailTemplateRoutes"));

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  
// --- 404 Not Found Handler ---
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// --- Global Error Handler ---
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "production"} mode on port ${PORT}`
      .yellow.bold,
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
