import React, { useState, useEffect, useRef } from 'react';
import JoinRoom from './components/JoinRoom';
import ChatRoom from './components/ChatRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // useRef kullanarak socket'e referans oluşturuyoruz
  const socketRef = useRef(null);

  useEffect(() => {
    // WebSocket bağlantısını başlatıyoruz
    socketRef.current = new WebSocket('ws://localhost:8080');

    const socket = socketRef.current;

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
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      const socket = socketRef.current;

      if (socket && socket.readyState === WebSocket.OPEN) {
        const msg = JSON.stringify({ type: 'join', username, room, message: `${username} joined the room` });
        socket.send(msg);
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('WebSocket bağlantısı kapalı.');
      }
    } else {
      setError('Kullanıcı adı ve oda numarası gerekli!');
    }
  };

  const sendMessage = () => {
    if (message) {
      const socket = socketRef.current;

      if (socket && socket.readyState === WebSocket.OPEN) {
        const msg = JSON.stringify({ type: 'message', username, room, message });
        socket.send(msg);
        setMessage('');
        setError('');
      } else {
        setError('WebSocket bağlantısı kapalı.');
      }
    } else {
      setError('Mesaj boş olamaz!');
    }
  };

  const leaveRoom = () => {
    const socket = socketRef.current;

    if (socket && socket.readyState === WebSocket.OPEN) {
      const msg = JSON.stringify({ type: 'leave', username, room, message: `${username} left the room` });
      socket.send(msg);
      setIsLoggedIn(false);
      setRoom('');
      setUsername('');
      setMessages([]);
      setUsersInRoom([]);
    }
  };

  return (
    <div className="mt-5">
      {!isLoggedIn ? (
        <JoinRoom
          joinRoom={joinRoom}
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          error={error}
        />
      ) : (
        <ChatRoom
          messages={messages}
          username={username}
          usersInRoom={usersInRoom}
          room={room}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          leaveRoom={leaveRoom}
        />
      )}
    </div>
  );
}

export default App;
