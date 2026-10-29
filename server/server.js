const WebSocket = require("ws");

const server = new WebSocket.Server({
  port: 8080
});

server.on("connection", (socket) => {
  console.log("Client connected");

  // Send a message to the client
  socket.send("Welcome to the WebSocket server!");

  // Receive messages from the client
  socket.on("message", (message) => {
    console.log("Client says:", message.toString());

    // Send a response back
    socket.send(`Server received: ${message}`);
  });
});

console.log("WebSocket server running on port 8080");