const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const profileRouter = require("../profiles/profile-router");
const listingsRouter = require("../listings/listings-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/profile", profileRouter);
server.use("/api/listings", listingsRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;