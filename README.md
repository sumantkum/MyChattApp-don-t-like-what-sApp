# 💬 Real-Time Chat Application

A real-time chat application built with **Node.js**, **Express**, and **Socket.IO** for the backend, and a modern **React** frontend (or HTML/CSS/JavaScript). Users can join the chat, send messages, see who's online, and receive typing indicators instantly.

---

## 🚀 Features

- 🔗 Real-time messaging via **WebSockets (Socket.IO)**
- 🙋 User joins with a unique username
- 💬 Chat messages with sender's name
- ✍️ Typing indicator (when someone is typing)
- 🟢 Active users list
- 📱 Responsive design for all devices

---

## 🧰 Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React.js / HTML, CSS, JavaScript |
| Backend      | Node.js, Express.js      |
| Real-time    | Socket.IO                |
| Tools        | dotenv, CORS, uuid       |

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app

cd server
npm install

PORT=4000
npm run dev

cd client
npm install
npm run dev
