### 1.0
Chat App
Bu proje, WebSocket tabanlı bir chat uygulamasıdır. İki ana bileşeni vardır:

chat-backend: WebSocket sunucusunu ve veritabanı işlemlerini yöneten Node.js tabanlı arka uç.
chat-frontend: React kullanılarak oluşturulmuş kullanıcı arayüzü.

Ön Koşullar
Node.js (v16 veya üstü)
npm (Node.js ile birlikte gelir)
SQLite3 (Veritabanı için)

Backend Kurulumu
chat-backend dizinine gidin:
```sh
cd chat-app/chat-backend
```
Veri Tabanı Hazırlık:
```sh
node setup_db.js
```
Gerekli bağımlılıkları yükleyin:
```sh
npm install
```

Veritabanını ve WebSocket sunucusunu başlatın:
```sh
npm start
```
Bu komut, WebSocket sunucusunu başlatır ve veritabanı bağlantısını oluşturur.

Frontend Kurulumu
chat-frontend dizinine gidin:
```sh
cd chat-app/chat-frontend
```

Gerekli bağımlılıkları yükleyin:
```sh
npm install
```

Uygulamayı başlatın:
```sh
npm start
```

Bu komut, React uygulamasını başlatır ve varsayılan olarak http://localhost:3000 adresinde erişilebilir hale getirir.

Kullanım
WebSocket Sunucusunu Başlatma:
```sh
node server.js
```

Arka uç sunucusu (chat-backend) başlatıldığında, WebSocket sunucusu ws://localhost:8080 adresinde dinlemeye başlar.

React Uygulamasına Erişim:

Tarayıcınızda http://localhost:3000 adresine gidin. Kullanıcı adı ve oda numarası girerek bir odaya katılabilir ve diğer kullanıcılarla sohbet edebilirsiniz.

Odaya Katılma:

Giriş ekranında kullanıcı adınızı ve oda numarasını girin, ardından "Giriş Yap" butonuna tıklayın.

Mesaj Gönderme:

Sohbet odasına katıldıktan sonra, mesajınızı yazın ve "Gönder" butonuna tıklayın.

Odayı Terketme:

Odayı terk etmek için "Odayı Terket" butonuna tıklayın.

Yapılandırma
chat-backend
server.js: WebSocket sunucusu ve veritabanı işlemlerini yöneten ana dosyadır.
Veritabanı: SQLite3 kullanılarak yapılandırılmıştır. Veritabanı dosyası chat_app.db olarak adlandırılmıştır ve tmp dizininde log dosyalarını tutar.
chat-frontend
src/App.js: Ana React bileşeni, kullanıcı girişini ve sohbet odası görünümünü yönetir.
src/components/JoinRoom.js: Kullanıcının odaya katılması için formu sağlar.
src/components/ChatRoom.js: Sohbet odasını ve mesajları görüntüler.

### 1.2

## YENİ KURULUM

Ana dizin içinde ilk kurulum için:

```sh
npm run first-setup

```

Veritabanı oluştuktan sonra çalıştırma:

```sh
npm run start-all
```

### 1.3

## İLK KURULUM 

```sh
npm run first-setup
```
Bu komut ile ilk olarak soket kısmında veri tabanını oluşturmak için setup_db.js çalıştırılacak. Ardından npm install yapıp server.js dosyasını başlatacak.
React kısmında install yapıp react için npm start verecek.


```sh
npm run start-all
```
Bu komut ilk kurulum sonrası veritabanı tekrar oluşturulmasın diye veri tabanı ve dosya yüklemelerini es geçip sadece soket ve arayüz başlamasını sağlayacak.