import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // No trailing slash
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let messages = [];
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send existing chat history
  socket.emit("chatHistory", messages);

  // When user joins with name
  socket.on("join", (username) => {
    socket.username = username;

    if (!onlineUsers.includes(username)) {
      onlineUsers.push(username);
    }

    console.log(`${username} joined chat`);
    io.emit("updateUsers", onlineUsers);
  });

  // New message sent
  socket.on("sendMessage", (data) => {
    messages.push(data);
    io.emit("receiveMessage", data);
  });

  // Deleting message
  socket.on("deleteMessage", (id) => {
    messages = messages.filter((msg) => msg.id !== id);
    io.emit("chatHistory", messages);
  });

  // Typing status
  socket.on("typing", (username) => {
    socket.broadcast.emit("userTyping", username);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    if (socket.username) {
      console.log(`${socket.username} disconnected`);
      onlineUsers = onlineUsers.filter((u) => u !== socket.username);
      io.emit("updateUsers", onlineUsers);
    } else {
      console.log("User disconnected:", socket.id);
    }
  });
});

server.listen(4000, () => {
  console.log("✅ Server running at http://localhost:4000");
});
