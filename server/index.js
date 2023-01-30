require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routes/index");

const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const ChatSocket = require("./socket/Socket");
const SocketRouter = require("./socket/Router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    const server = app.listen(process.env.PORT, () =>
      console.log("Server started")
    );

    new ChatSocket(server, SocketRouter);
  } catch (e) {
    console.log(e);
  }
};

start();
