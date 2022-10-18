module.exports = {
  socketConfig: {
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"],
    },
    withCredentials: true,
  },
};
