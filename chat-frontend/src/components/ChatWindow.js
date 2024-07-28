import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../App.css'; // Stil dosyasını ekleyin

const ChatWindow = ({ messages, username }) => (
  <div className="chat-window mb-4">
    <ListGroup>
      {messages.map((msg, index) => (
        <ListGroup.Item
          key={index}
          className={`message-item ${msg.username === username ? 'sent' : 'received'}`}
        >
          <strong>{msg.username}:</strong> {msg.message}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default ChatWindow;
