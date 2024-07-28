import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../App.css'; // Stil dosyasını ekleyin

const ChatInput = ({ sendMessage, leaveRoom }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input">
      <Form>
        <Row className="align-items-center">
          <Col xs={9}>
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                placeholder="Mesajınızı yazın"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
              />
            </Form.Group>
          </Col>
          <Col xs={3} className="text-end">
            <Button variant="primary" onClick={handleSendMessage} className="send-button">Gönder</Button>
          </Col>
        </Row>
      </Form>
      <Button variant="danger" className="mt-3 leave-button" onClick={leaveRoom}>Odayı Terket</Button>
    </div>
  );
};

export default ChatInput;
