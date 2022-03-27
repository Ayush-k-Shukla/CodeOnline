const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running at 8000`);
});

io.on('connection', (socket) => {
  console.log(`Socket connected : ${socket.id}`);
});
