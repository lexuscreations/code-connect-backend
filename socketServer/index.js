const {
  onNewConnection,
  onJoin,
  onCodeChange,
  onSyncCode,
  onDisconnecting,
} = require("./controller");

const init = (IO) => {
  IO.on("connection", (socket) => {
    onNewConnection(socket, IO);
    onJoin(socket, IO);
    onCodeChange(socket, IO);
    onSyncCode(socket, IO);
    onDisconnecting(socket, IO);
  });
};

module.exports = { init };
