import Logger from "bunyan";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface RequestLoggerOptions {
  headerName?: string;
  level?: string;
}

const getDuration = (start: [number, number]) => {
  const diff = process.hrtime(start);
  return diff[0] * 1e3 + diff[1] * 1e-6;
};

export const requestLogger = (
  options: RequestLoggerOptions,
  logger: Logger
) => {
  const headerName = options.headerName || "X-Request-Id",
    headerNameLower = headerName.toLowerCase(),
    level = options.level || "info";

  return (req: Request, res: Response, next: NextFunction) => {
    const request_id = req.headers[headerNameLower] || uuidv4();
    const start = process.hrtime();

    req.log = logger.child({ request_id });

    res.setHeader(headerNameLower, request_id);

    res.on("finish", function responseSent() {
      req.log?.info({ duration: getDuration(start) }, "request finish");
    });

    next();
  };
};
