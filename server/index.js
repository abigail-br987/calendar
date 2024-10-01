const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_note", (data) => {
    console.log("Note received:", data); // Log received note data
    // Emit to all connected clients
    io.emit("receive_note", data); // Ensure this is correctly formatted
    console.log("Note emitted to all clients:", data); // Log the emitted note
  });
});


server.listen(3006, () => {
  console.log("server is running");
});
