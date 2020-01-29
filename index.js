const express = require("express");
const { logger } = require("./middleware/middleware.js");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const server = express();

server.use(express.json());
server.use(logger);
server.use("/user", userRouter);

server.listen(8000, () => console.log("*** API ON PORT: 8000 ***"));
