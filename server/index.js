const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});



const rooms = {};

function generateUniqueId() {
  return Math.random().toString(36);
}

io.on("connection", (socket) => {
  console.log(`user joined: ${socket.id}`);

  socket.on("createCalendar", (data) => {
    const { userId } = data; 
    const roomId = generateUniqueId();
    rooms[roomId] = { owner: userId, notes: [] }; 

    socket.join(roomId);

    io.to(socket.id).emit("calendarCreated", { 
      roomId, 
      url: `http://localhost:5173/calendar/${roomId}` 
    });

    console.log(`new room: ${roomId} by ${userId}`);
  });

  socket.on("joinRoom", (roomId) => {
    if (rooms[roomId]) {
      socket.join(roomId); 
      console.log(`user  ${socket.id} joined ${roomId}`);
    } else {
      socket.emit("error", { message: "Room does not exist" });
    }
  });


  socket.on("send_note", (data) => {
    const { roomId, noteData } = data;
    if (rooms[roomId]) {
      rooms[roomId].notes.push(noteData);
      console.log(`send to room ${data.roomId}:`, noteData);
      io.to(roomId).emit("receive_note", { noteData }); 
    } else {
      socket.emit("error", { message: "Room does not exist" });
    }
  });
  socket.on("disconnect", () => {
    console.log(`user left: ${socket.id}`);
  });
});

server.listen(3006, () => {
  console.log("server running");
});
