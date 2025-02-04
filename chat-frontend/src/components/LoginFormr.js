import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = ({ username, setUsername, room, setRoom, joinRoom, error }) => (
  <div className="text-center">
    <h1>Chat Uygulaması</h1>
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

export default LoginForm;
