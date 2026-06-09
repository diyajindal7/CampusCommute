require("dotenv").config();
console.log("JWT =", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");
const adminRoutes =
require("./routes/adminRoutes");
const lobbyRoutes =
require("./routes/lobbyRoutes");
const Message =
require("./models/Message");
const connectDB = require("./config/db");

const chatRoutes =
require("./routes/chatRoutes");

const reportRoutes =
require("./routes/reportRoutes");

const notificationRoutes =
  require(
    "./routes/notificationRoutes"
  );

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CampusCommute Backend Running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/lobbies",
  lobbyRoutes
);
app.use(
  "/api/reports",
  reportRoutes
);


app.use(
  "/api/chat",
  chatRoutes
);
app.use(
  "/api/notifications",
  notificationRoutes
);

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  socket.on("joinLobby", (lobbyId) => {

    socket.join(lobbyId);

    console.log(
      `Joined Lobby: ${lobbyId}`
    );

  });

 socket.on(
  "sendMessage",
  async (data) => {
    console.log("MESSAGE DATA:", data);

    await Message.create({
      sender: data.sender,
      message: data.message,
      lobbyId: data.lobbyId,
    });

    io.to(data.lobbyId).emit(
      "receiveMessage",
      data
    );

  }
);

  socket.on("disconnect", () => {

    console.log(
      "User Disconnected:",
      socket.id
    );

  });

});

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});