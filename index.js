const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const socketServer = require("./socketServer/");
const { socketConfig } = require("./config/");

const app = express();
const server = http.createServer(app);
const io = new Server(server, socketConfig);

socketServer.init(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
