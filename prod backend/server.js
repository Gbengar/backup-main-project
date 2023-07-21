const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
//const { Server } = require("socket.io");

const app = express();

// Middlewares

app.use(bodyParser.json());
/* 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "https://main-project-backend-8rc2.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
); */

// Socket.io Server

/*const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
*/

app.use((req, res, next) => {
  // Set the appropriate Access-Control-Allow-Origin header based on the requesting origin
  // In this case, you can use the requesting origin directly, as you're not handling credentials
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);

  // Set other CORS-related headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  // Set Access-Control-Allow-Credentials to true if your requests include credentials (e.g., cookies, HTTP authentication)
  // If you're not handling credentials, you can omit this line or set it to 'false'
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Continue with the request handling
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

// Error Middleware
app.use(errorHandler);

// connect to Db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
