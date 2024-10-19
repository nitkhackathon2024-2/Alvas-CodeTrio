const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 9000;

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  },
});

const upload = multer({ storage });

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the files statically so users can download them
app.use("/uploads", express.static("uploads"));

// Serve the main HTML file when the root is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "messaging.html"));
});

// Handle file uploads via HTTP POST
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({
    fileUrl: `/uploads/${req.file.filename}`, // Return the URL of the uploaded file
    fileName: req.file.originalname,
  });
});

// Socket.IO message handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Register user
  socket.on("register-user", (username) => {
    socket.username = username;
  });

  // Handle text messages
  socket.on("user-message", (data) => {
    io.emit("message", {
      message: data.message,
      from: socket.id, // Use socket.id to identify the sender
      contact: data.contact,
      type: "text",
    });
  });

  // Handle file messages
  socket.on("file-message", (data) => {
    io.emit("message", {
      message: data.fileUrl,
      from: socket.id,
      fileName: data.fileName,
      contact: data.contact,
      type: "file",
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
