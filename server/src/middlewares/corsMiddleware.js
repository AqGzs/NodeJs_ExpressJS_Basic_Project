const cors = require("cors");

// Cấu hình CORS
const corsOptions = {
    origin: ["http://localhost:5000", "https://mydomain.com"], // Chỉ cho phép frontend tin cậy
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

const enableCORS = cors(corsOptions);

module.exports = enableCORS;
