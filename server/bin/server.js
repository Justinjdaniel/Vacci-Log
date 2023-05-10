#!/usr/bin/env node

// Import dependencies
import debugLib from 'debug';
import http from 'http';
import app from '../app.js';
import connectDB from '../src/config/mongoDB.js';

const debug = debugLib('vacci-log:server');

// Set the port for the application
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create the HTTP server
const server = http.createServer(app);

// Start the server and add event listeners
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Connect to MongoDB
connectDB();

// Normalize the port value
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // named pipe
  }

  if (port >= 0) {
    return port; // port number
  }

  return false;
}

// Handle server errors
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Display friendly error messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

// Log server listening information
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
