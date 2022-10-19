const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
  socketConfig: {
    cors: {
      origin:
        process.env.FRONTEND_URL || "https://lexus-codeconnect.netlify.app",
      credentials: true,
      methods: ["GET", "POST"],
    },
    withCredentials: true,
  },
};
