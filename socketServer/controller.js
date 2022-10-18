const { socketActions } = require("../constraints");
const { userSocketMap } = require("./DB");
const { getAllConnectedClients } = require("./services");

module.exports = {
  onNewConnection: (socket, IO) => console.log("socket connected", socket.id),
  onJoin: (socket, IO) =>
    socket.on(socketActions.JOIN, ({ roomId, username }) => {
      userSocketMap[socket.id] = username;
      socket.join(roomId);
      const clients = getAllConnectedClients(roomId, IO);
      clients.forEach(({ socketId }) =>
        IO.to(socketId).emit(socketActions.JOINED, {
          clients,
          username,
          socketId: socket.id,
        })
      );
    }),
  onCodeChange: (socket, IO) =>
    socket.on(socketActions.CODE_CHANGE, ({ roomId, code }) =>
      socket.in(roomId).emit(socketActions.CODE_CHANGE, { code })
    ),
  onSyncCode: (socket, IO) =>
    socket.on(socketActions.SYNC_CODE, ({ socketId, code }) =>
      IO.to(socketId).emit(socketActions.CODE_CHANGE, { code })
    ),
  onDisconnecting: (socket, IO) =>
    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) =>
        socket.in(roomId).emit(socketActions.DISCONNECTED, {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        })
      );
      delete userSocketMap[socket.id];
      socket.leave();
    }),
};
