import bunyan from "bunyan";

/**
 * Base Logger
 */
export const logger = bunyan.createLogger({
  name: "myapp",
});
