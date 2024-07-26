const express = require('express');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Express ve SQLite
const app = express();
const port = 8080;
const db = new sqlite3.Database('chat_app.db', (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('Veritabanı bağlantısı başarılı');
    
    // Veritabanı tablolarını oluşturma
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        room TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        room TEXT,
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// WebSocket Sunucusu
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Yeni bağlantı kuruldu');

  ws.on('message', (message) => {
    try {
      const msg = JSON.parse(message);
      const { username, room, message: text } = msg;

      if (username && room) {
        ws.room = room; // WebSocket bağlantısına oda bilgisi ekle

        db.run(
          'INSERT INTO users (username, room) VALUES (?, ?)',
          [username, room],
          (err) => {
            if (err) {
              console.error('Kullanıcı ekleme hatası:', err);
            }
          }
        );

        const logPath = path.join('/tmp', `${room}.json`);
        const logEntry = {
          username,
          message: text,
          sent_at: new Date().toISOString(),
        };
        fs.appendFile(logPath, JSON.stringify(logEntry) + '\n', (err) => {
          if (err) console.error('Log dosyasına yazma hatası:', err);
        });

        db.run(
          'INSERT INTO messages (username, room, message) VALUES (?, ?, ?)',
          [username, room, text],
          (err) => {
            if (err) {
              console.error('Veritabanına ekleme hatası:', err);
            }
          }
        );

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client.room === room) {
            client.send(JSON.stringify(msg));
          }
        });
      }
    } catch (error) {
      console.error('Mesaj işleme hatası:', error);
    }
  });

  ws.on('close', () => {
    console.log('Bağlantı kapandı');
    // Kullanıcı çıkış işlemleri buraya eklenecek

    
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
