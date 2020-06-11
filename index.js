const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();
const port = 7878;

server.use(express.json());

server.use(logger);

server.use(userRouter);

server.listen(port, () => {
  console.log(`Server going 'brr' at http://localhost:${port}`);
});
