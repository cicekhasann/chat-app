import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ChatInput = ({ sendMessage, leaveRoom }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            placeholder="Mesajınızı yazın"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={handleSendMessage}>Gönder</Button>
      </Form>
      <Button variant="danger" className="mt-3" onClick={leaveRoom}>Odayı Terket</Button>
    </div>
  );
};

export default ChatInput;
