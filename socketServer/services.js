const { map2Array } = require("../helper");
const { userSocketMap } = require("./DB");

module.exports = {
  getAllConnectedClients: (roomId, IO) =>
    map2Array(IO.sockets.adapter.rooms.get(roomId)).map(
      (socketId) => socketId && { socketId, username: userSocketMap[socketId] }
    ),
};
