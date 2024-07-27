import React from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap';
import '../App.css'; // Özel stil dosyası

const ChatRoom = ({ messages, username, usersInRoom, room, message, setMessage, sendMessage, leaveRoom }) => {
  return (
    <Container className="chat-room-container mt-5">
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header>
              <h3>Mevcut Kullanıcılar</h3>
              <h5>Oda: {room}</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {usersInRoom.map((user, index) => (
                <ListGroup.Item key={index}>{user}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <div className="chat-messages mb-4">
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
          <Form className="message-form">
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                placeholder="Mesajınızı yazın"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={sendMessage}>Gönder</Button>
          </Form>
          <Button variant="danger" className="mt-3" onClick={leaveRoom}>Odayı Terket</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatRoom;
