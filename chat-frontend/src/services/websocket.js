export const setupSocket = (username, room, setMessages, setUsersInRoom, setError) => {
    const socket = new WebSocket('ws://localhost:8080');
  
    socket.onopen = () => {
      console.log('WebSocket bağlantısı kuruldu.');
    };
  
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        handleIncomingMessage(msg, setMessages, setUsersInRoom);
      } catch (error) {
        console.error('Mesajı çözümleme hatası:', error);
      }
    };
  
    socket.onclose = () => {
      console.log('WebSocket bağlantısı kapandı.');
    };
  
    return socket;
  };
  
  export const handleIncomingMessage = (msg, setMessages, setUsersInRoom) => {
    if (msg.type === 'usersList') {
      setUsersInRoom(msg.users || []);
    } else if (msg.type === 'message' && msg.username && msg.message) {
      setMessages((prevMessages) => [...prevMessages, msg]);
    } else {
      console.warn('Beklenmeyen mesaj türü:', msg);
    }
  };
  