import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const socket = new WebSocket('ws://localhost:8080');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket bağlantısı kuruldu.');
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === 'usersList') {
          setUsersInRoom(msg.users || []);
        } else if (msg.type === 'message' && msg.username && msg.message) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        } else {
          console.warn('Beklenmeyen mesaj türü:', msg);
        }
      } catch (error) {
        console.error('Mesajı çözümleme hatası:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket bağlantısı kapandı.');
    };

    return () => {
      socket.onclose = null;
      socket.onmessage = null;
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      const msg = JSON.stringify({ username, room, message: `${username} joined the room` });
      socket.send(msg);
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Kullanıcı adı ve oda numarası gerekli!');
    }
  };

  const sendMessage = () => {
    if (message) {
      const msg = { username, room, message };
      socket.send(JSON.stringify(msg));
      setMessage('');
      setError('');
    } else {
      setError('Mesaj boş olamaz!');
    }
  };

  const leaveRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ username, room, message: `${username} left the room` }));
      socket.close();
      setIsLoggedIn(false);
      setRoom('');
      setUsername('');
      setMessages([]);
      setUsersInRoom([]);
    }
  };

  return (
    <Container className="mt-5">
      {!isLoggedIn ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center mb-4">
              <h1>Chat Uygulaması</h1>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Kullanıcı Adı</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kullanıcı Adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formRoom">
                <Form.Label>Oda Numarası</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Oda Numarası"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={joinRoom}>Giriş Yap</Button>
            </Form>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={6} className="mx-auto">
            <div className="text-center mb-4">
              <h2>Oda: {room}</h2>
              <h3>Mevcut Kullanıcılar:</h3>
              <ListGroup>
                {usersInRoom.map((user, index) => (
                  <ListGroup.Item key={index}>{user}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="mb-4">
              <ListGroup>
                {messages.map((msg, index) => (
                  <ListGroup.Item key={index}>
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
      )}
    </Container>
  );
}

export default App;
