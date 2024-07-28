const express = require('express');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Express
const app = express();
const port = 8080;

// SQLite Veritabanı Bağlantısı
const db = new sqlite3.Database('chat_app.db', (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('Veritabanı bağlantısı başarılı');
  }
});

// WebSocket Sunucusu
const wss = new WebSocket.Server({ noServer: true });

// Oda başına kullanıcı bağlantılarını ve logları saklayan nesneler
const roomUsers = {};
const roomLogs = {}; // Oda başına logları saklamak için

wss.on('connection', (ws) => {
  let userName = '';
  let userRoom = '';

  ws.on('message', (message) => {
    try {
      const msg = JSON.parse(message);
      const { username, room, message: text, type } = msg;

      if (type === 'join') {
        // Oda kullanıcı listesini güncelle
        if (!roomUsers[room]) {
          roomUsers[room] = new Set();
        }
        if (roomUsers[room].has(username)){
          ws.send(JSON.stringify({type: 'error', message: 'Aynı kullanıcı mevcut odadad!!'}));
          ws.close();
          return;
        }else {
        roomUsers[room].add(username);
        ws.room = room;
        ws.username = username;
        userName = username;
        userRoom = room;

        // Log dosyasının yolu
        const logDir = path.join(__dirname, 'tmp');
        // Log dizinini kontrol et, yoksa oluştur
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir);
        }
        const logPath = path.join(logDir, `${room}.json`);

        // Log girişini ekleme
        const logEntry = {
          username,
          message: text,
          sent_at: new Date().toISOString(),
        };

        if (!roomLogs[room]) {
          roomLogs[room] = [];
        }
        roomLogs[room].push(logEntry);

        // Geçici log dosyasına yazma
        fs.appendFile(logPath, JSON.stringify(logEntry) + '\n', (err) => {
          if (err) console.error('Log dosyasına yazma hatası:', err);
        });

        // Odaya katılan kullanıcıya mevcut kullanıcı listesini gönderme
        const usersInRoom = Array.from(roomUsers[room]);
        ws.send(JSON.stringify({ type: 'usersList', users: usersInRoom }));

        // Diğer kullanıcılara yeni kullanıcıyı bildirme
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client.room === room) {
            client.send(JSON.stringify({ type: 'usersList', users: usersInRoom }));
            client.send(JSON.stringify({ type: 'message', username, message: text }));
          }
        });
       }
      } else if (type === 'message') {
        // Odaya gönderilen mesajı diğer kullanıcılara iletme
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client.room === room) {
            client.send(JSON.stringify(msg));
          }
        });
      } else if (type === 'leave') {
        if (roomUsers[userRoom]) {
          roomUsers[userRoom].delete(userName);
          if (roomUsers[userRoom].size === 0) {
            console.log(`Oda kapatılıyor: ${userRoom}`);
            delete roomUsers[userRoom];

            // Oda kapandı, logları veritabanına aktarma
            if (roomLogs[userRoom]) {
              const logEntries = roomLogs[userRoom];
              logEntries.forEach((logEntry) => {
                db.run(
                  'INSERT INTO messages (username, room, message, sent_at) VALUES (?, ?, ?, ?)',
                  [logEntry.username, userRoom, logEntry.message, logEntry.sent_at],
                  (err) => {
                    if (err) {
                      console.error('Veritabanına ekleme hatası:', err);
                    } else {
                      console.log('Veritabanına mesaj eklendi:', logEntry);
                    }
                  }
                );
              });

              // Logları temizle ve log dosyasını sil
              delete roomLogs[userRoom];
              const logPath = path.join(__dirname, 'tmp', `${userRoom}.json`);
              if (fs.existsSync(logPath)) {
                fs.unlink(logPath, (err) => {
                  if (err) console.error('Log dosyasını silme hatası:', err);
                });
              }
            }
          }
        }

        // Kullanıcının odadan ayrıldığını bildirme
        const leaveMessage = { type: 'message', username: userName, message: `${userName} left the room` };
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client.room === userRoom) {
            client.send(JSON.stringify(leaveMessage));
            client.send(JSON.stringify({ type: 'usersList', users: Array.from(roomUsers[userRoom] || []) }));
          }
        });
      }
    } catch (error) {
      console.error('Mesaj işleme hatası:', error);
    }
  });

  ws.on('close', () => {
    if (userRoom && userName) {
      // Oda kullanıcı listesinden çıkarma
      if (roomUsers[userRoom]) {
        roomUsers[userRoom].delete(userName);
        if (roomUsers[userRoom].size === 0) {
          console.log(`Oda kapatılıyor: ${userRoom}`);
          delete roomUsers[userRoom];

          // Oda kapandı, logları veritabanına aktarma
          if (roomLogs[userRoom]) {
            const logEntries = roomLogs[userRoom];
            logEntries.forEach((logEntry) => {
              db.run(
                'INSERT INTO messages (username, room, message, sent_at) VALUES (?, ?, ?, ?)',
                [logEntry.username, userRoom, logEntry.message, logEntry.sent_at],
                (err) => {
                  if (err) {
                    console.error('Veritabanına ekleme hatası:', err);
                  } else {
                    console.log('Veritabanına mesaj eklendi:', logEntry);
                  }
                }
              );
            });

            // Logları temizle ve log dosyasını sil
            delete roomLogs[userRoom];
            const logPath = path.join(__dirname, 'tmp', `${userRoom}.json`);
            if (fs.existsSync(logPath)) {
              fs.unlink(logPath, (err) => {
                if (err) console.error('Log dosyasını silme hatası:', err);
              });
            }
          }
        }
      }

      // Kullanıcının odadan ayrıldığını bildirme
      const leaveMessage = { type: 'message', username: userName, message: `${userName} left the room` };
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.room === userRoom) {
          client.send(JSON.stringify(leaveMessage));
          client.send(JSON.stringify({ type: 'usersList', users: Array.from(roomUsers[userRoom] || []) }));
        }
      });
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
