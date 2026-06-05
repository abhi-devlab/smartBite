import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ChatBot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [waitingForImage, setWaitingForImage] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Toggle state for chatbot visibility

  // Fetch Initial Greeting from Backend
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await axios.get("http://localhost:8000/chat");
        setMessages([{ sender: "bot", text: response.data.response }]);
      } catch (error) {
        console.error("Error fetching greeting:", error);
      }
    };
    fetchGreeting();
  }, []);

  // Send Message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        message: input,
      });

      const botText = response.data.response;
      const botMessage = { sender: "bot", text: botText };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      if (botText.toLowerCase().includes("please upload an image")) {
        setWaitingForImage(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  // Handle Enter Key Press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8000/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: "Image uploaded" }, botMessage]);

      setWaitingForImage(false);
      setImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {/* Chatbox */}
      <div className={`chat-container ${isOpen ? "active" : ""}`}>
        <div className="chat-header">🩺 Virtual Doctor</div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          {!waitingForImage ? (
            <>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="chat-input"
              />
              <button onClick={sendMessage} className="chat-button">Send</button>
            </>
          ) : (
            <>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="chat-file-input" />
              <button onClick={handleImageUpload} className="chat-button">Upload</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Chatbot;
