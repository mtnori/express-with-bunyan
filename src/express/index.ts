import express from "express";
import api from "./api";

import { logger } from "./logger";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  logger.info("hi");
  res.send("Hello World");
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
