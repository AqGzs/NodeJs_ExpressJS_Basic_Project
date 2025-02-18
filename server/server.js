const http = require("http");
const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.on("request", (req, res) => {
  res.removeHeader("Server");
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
