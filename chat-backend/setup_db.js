const sqlite3 = require('sqlite3').verbose();

// Veritabanı bağlantısını aç
const db = new sqlite3.Database('chat_app.db', (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  } else {
    console.log('Veritabanı bağlantısı başarılı');
  }
});

db.serialize(() => {
  // Kullanıcılar tablosunu oluştur
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    room TEXT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Kullanıcılar tablosunu oluşturma hatası:', err);
    } else {
      console.log('Kullanıcılar tablosu oluşturuldu');
    }
  });

  // Mesajlar tablosunu oluştur
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    room TEXT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Mesajlar tablosunu oluşturma hatası:', err);
    } else {
      console.log('Mesajlar tablosu oluşturuldu');
    }
  });

  // Log tablosunu oluştur
  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    action TEXT NOT NULL, -- 'join' veya 'leave'
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Log tablosunu oluşturma hatası:', err);
    } else {
      console.log('Log tablosu oluşturuldu');
    }
  });
});

// Veritabanı bağlantısını kapat
db.close((err) => {
  if (err) {
    console.error('Veritabanı kapatma hatası:', err);
  } else {
    console.log('Veritabanı kapatıldı');
  }
});
