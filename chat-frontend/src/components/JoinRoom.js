// src/components/JoinRoom.js
import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const JoinRoom = ({ joinRoom, username, setUsername, room, setRoom, error }) => {
  return (
    <div>
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
    </div>
  );
};

export default JoinRoom;
