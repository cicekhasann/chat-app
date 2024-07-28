import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap';
import '../App.css'; // Özel stil dosyası

const ChatRoom = ({ messages, username, usersInRoom, room, message, setMessage, sendMessage, leaveRoom }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const monkeyImages = [
    "https://getwallpapers.com/wallpaper/full/f/3/3/705786-download-cute-monkey-backgrounds-1920x1080-for-tablet.jpg",
    "https://getwallpapers.com/wallpaper/full/0/3/d/705737-vertical-cute-monkey-backgrounds-1920x1200-for-iphone-5s.jpg",
    "https://getwallpapers.com/wallpaper/full/7/9/a/705877-vertical-cute-monkey-backgrounds-1920x1080-for-iphone-6.jpg",
    "https://getwallpapers.com/wallpaper/full/2/f/9/705660-cute-monkey-backgrounds-1920x1080-xiaomi.jpg",
    "https://getwallpapers.com/wallpaper/full/a/4/7/705866-cute-monkey-backgrounds-1920x1080-for-computer.jpg",
    "https://getwallpapers.com/wallpaper/full/e/b/4/705704-free-cute-monkey-backgrounds-2560x1440-samsung.jpg",
    "https://getwallpapers.com/wallpaper/full/e/a/2/705851-cute-monkey-backgrounds-1920x1200-for-1080p.jpg",
    "https://images5.alphacoders.com/390/thumb-1920-390941.jpg",
    "https://i.pinimg.com/736x/d2/a2/c9/d2a2c9580d0d726b50fa525a0ee780ee.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgCgOapPwzB1pM_Sq7f2ARlKvtZbEKY0lmDw&s",
    "https://wallpapers.com/images/hd/cool-gorilla-2l9s0pa29fwfqnwm.jpg",


  ];

  useEffect(() => {
    const randomImage = monkeyImages[Math.floor(Math.random() * monkeyImages.length)];
    setBackgroundImage(randomImage);
  }, []);

  const formatMessage = (msg) => {
    if (msg.message.includes('joined the room')) {
      return `Maymun ${msg.username} aramıza katıldı`;
    }
    return msg.message;
  };

  return (
    <Container className="chat-room-container mt-5" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header>
              <h3>Mevcut Maymunlar</h3>
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
                placeholder="Mesaj Yazmak"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={sendMessage}>Göndermek</Button>
          </Form>
          <Button variant="danger" className="mt-3" onClick={leaveRoom}>Odayı Terketmek</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatRoom;
