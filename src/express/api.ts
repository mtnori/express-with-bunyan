import express from "express";
import { logger } from "./logger";

import { requestLogger } from "./middleware/requestLogger";

const router = express.Router();

router.use(requestLogger({}, logger));

router.get("/", (req, res) => {
  req.log?.info("api");
  res.send("API is called");
});

export default router;
