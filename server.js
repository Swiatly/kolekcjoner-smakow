const app = require("./backend/app"); // Import Express application from "app" file in the "backend" folder.
const debug = require("debug")("node-angular"); // Import debugging module.
const http = require("http"); // Import HTTP module for server handling.

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // Return named pipe if value is not a number.
  }

  if (port >= 0) {
    return port; // Return port if value is a valid number.
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error; // Throw error if it is not related to "listen".
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1); // Exit with error code if port requires admin privileges.
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1); // Exit with error code if port is already in use.
      break;
    default:
      throw error; // Throw error for other cases.
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind); // Log listening status.
};

const port = normalizePort(process.env.PORT || "3000"); // Set port (from environment or default to 3000).
app.set("port", port); // Assign port to the Express app.

const server = http.createServer(app); // Create HTTP server with the Express app.
server.on("error", onError); // Handle server errors.
server.on("listening", onListening); // Handle server listening event.
server.listen(port); // Start server on the specified port.
