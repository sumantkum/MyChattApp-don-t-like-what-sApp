import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

const socket = io("http://localhost:4000");

const ChatApp = ({ username }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (input.trim()) {
      const newMsg = { id: uuid(), user: username, text: input };
      socket.emit("sendMessage", newMsg);
      setInput("");
    }
  };

  const deleteMessage = (id) => {
    socket.emit("deleteMessage", id);
  };

  useEffect(() => {
    socket.emit("join", username);

    socket.on("chatHistory", (data) => setMessages(data));
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("updateUsers", (userList) => {
      setUsersOnline(userList);
    });
    socket.on("userTyping", (user) => {
      if (user !== username) {
        setTypingUser(user);
        setTimeout(() => setTypingUser(""), 2000);
      }
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
      socket.off("updateUsers");
      socket.off("userTyping");
    };
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = (e) => {
    setInput(e.target.value);
    socket.emit("typing", username);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white p-4">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Chat Section */}
        <div className="flex-1 bg-[#10151f] rounded-xl p-4 shadow-lg flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {username}</h2>

          <div className="bg-[#1e2738] p-4 h-[400px] overflow-y-scroll mb-2 rounded-lg flex flex-col gap-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user === username ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-xl text-sm max-w-[70%] break-words ${
                    msg.user === username
                      ? "bg-blue-600 text-left"
                      : "bg-purple-700 text-right"
                  }`}
                >
                  <span className="font-bold block text-white">{msg.user}</span>
                  <span className="block">{msg.text}</span>
                  {msg.user === username && (
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="mt-1 text-red-300 text-xs hover:text-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {typingUser && (
            <p className="text-sm italic text-yellow-300">{typingUser} is typing...</p>
          )}

          <div className="flex flex-col sm:flex-row mt-4 gap-2">
            <input
              className="flex-1 p-2 rounded-lg bg-[#2c3e50] text-white focus:outline-none focus:ring focus:ring-yellow-400"
              value={input}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>

        {/* Online Users */}
        <div className="bg-[#10151f] w-full lg:w-72 rounded-xl p-4 shadow-lg h-[400px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3 text-green-400">Online Users</h3>
          <ul className="space-y-2">
            {usersOnline.map((user, index) => (
              <li key={index} className="flex items-center gap-2 text-white">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {user}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
