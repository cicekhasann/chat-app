// src/components/ChatRoom.js
import React from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap';

const ChatRoom = ({ messages, username, usersInRoom, room, message, setMessage, sendMessage, leaveRoom }) => {
  return (
    <Container className="mt-5">
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
          <div className="mb-4" style={{ height: '60vh', overflowY: 'scroll' }}>
            <ListGroup>
              {messages.map((msg, index) => (
                <ListGroup.Item key={index} className={msg.username === username ? 'text-end' : 'text-start'}>
                  <strong>{msg.username}:</strong> {msg.message}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <Form>
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
