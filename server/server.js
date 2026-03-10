import { Server } from "socket.io";
import { createServer } from "node:http";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
});

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

server.listen(4600, (err) => {
  if (err) console.error(err.message);
  else console.log("server is setup at http://localhost:4600");
});
