import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import '../App.css'; // Stil dosyasını ekleyin

const UserList = ({ room, usersInRoom }) => (
  <Card className="user-list">
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
);

export default UserList;
