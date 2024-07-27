import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const UserList = ({ room, usersInRoom }) => (
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
);

export default UserList;
