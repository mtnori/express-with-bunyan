import bunyan from "bunyan";

console.log("initialize");

export const logger = bunyan.createLogger({
  name: "myapp",
});
