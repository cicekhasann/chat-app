#!/bin/bash

# Directory containing JSON logs
LOG_DIR="/tmp"

# SQLite database file
DB_FILE="chat_app.db"

# Export logs
for file in $LOG_DIR/*.json; do
  while IFS= read -r line; do
    username=$(echo $line | jq -r '.username')
    message=$(echo $line | jq -r '.message')
    sent_at=$(echo $line | jq -r '.sent_at')
    room=$(basename "$file" .json)

    sqlite3 $DB_FILE "INSERT INTO messages (username, room, message, sent_at) VALUES ('$username', '$room', '$message', '$sent_at');" || echo "Veritabanına aktarım hatası: $room"
  done < "$file"
done
