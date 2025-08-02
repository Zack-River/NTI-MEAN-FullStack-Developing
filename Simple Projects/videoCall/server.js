const fs = require('fs');
const https = require('https');
const express = require('express');
const WebSocket = require('ws');

const app = express();

const server = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app);

app.use(express.static('public'));

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected. Total clients:', wss.clients.size);

  ws.on('message', message => {
    let msgString;
    if (typeof message === 'string') {
      msgString = message;
    } else if (message instanceof Buffer) {
      msgString = message.toString();
    } else {
      // Ignore unknown message types
      return;
    }

    // Broadcast signaling messages to all other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msgString);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected. Total clients:', wss.clients.size);
  });

  ws.on('error', err => {
    console.error('WebSocket error:', err);
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTPS + WSS server running at https://192.168.100.13:${PORT}`);
});