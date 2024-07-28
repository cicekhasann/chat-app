// src/components/JoinRoom.js
import React from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import '../App.css';

const JoinRoom = ({ joinRoom, username, setUsername, room, setRoom, error }) => {
  return (
    <div className="center-container">
      <div className="join-room">
        <h2>Maymunlar Güçlü Birlikte</h2>
        <input
          type="text"
          placeholder="Maymun Ad"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Oda Numara"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Katılmak</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};


export default JoinRoom;
