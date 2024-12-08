import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { sender: 'User', content: message });
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.sender}: {msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
