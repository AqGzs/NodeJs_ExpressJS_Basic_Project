const { Server } = require("socket.io");

let io;

const initWebSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log(`⚡ New WebSocket Connection: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`❌ WebSocket Disconnected: ${socket.id}`);
        });
    });
};

const sendNotification = (userId, message) => {
    if (io) {
        io.emit(`user:${userId}`, { message });
    }
};

module.exports = { initWebSocket, sendNotification };
