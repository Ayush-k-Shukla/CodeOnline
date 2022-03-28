const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/constants/actions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running at 8000`);
});

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
  //get all client connected to roomId and then send by converting into object
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return { socketId, username: userSocketMap[socketId] };
    }
  );
};

io.on('connection', (socket) => {
  console.log(`Socket connected : ${socket.id}`);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clientsConnected = getAllConnectedClients(roomId);
    console.log(clientsConnected);

    clientsConnected.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clientsConnected,
        username,
        socketId: socket.id,
      });
    });
  });
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave(); //leave the room
  });
});
