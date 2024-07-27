import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatWindow = ({ messages, username }) => (
  <div className="mb-4" style={{ height: '60vh', overflowY: 'scroll' }}>
    <ListGroup>
      {messages.map((msg, index) => (
        <ListGroup.Item key={index} className={msg.username === username ? 'text-end' : 'text-start'}>
          <strong>{msg.username}:</strong> {msg.message}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default ChatWindow;
