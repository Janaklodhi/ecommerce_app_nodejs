const http = require("http");
const port = 3000;
const app = require("./app");
console.log(app);
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on("error", (error) => {
  console.error(`Server failed to start. Error: ${error.message}`);
});