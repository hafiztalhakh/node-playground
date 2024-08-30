'use strict';

require('dotenv').config();
const http = require('http');
const express = require('express');

const connectDB = require('./config/db');
const routes = require('./routes');

/**
 * Creating express application instance
 */
const app = express();

// @Routes
routes(app);

/**
 * Creating express server using http
 */
const server = http.createServer(app);

/**
 * Connecting to database
 */
connectDB();

/**
 * Listening to the requests
 */
server.listen(process.env.PORT || 8080, () => {
  console.log('------------------------------');
  console.log('\u001b[' + 32 + 'm' + 'Server is Running.' + '\u001b[0m');
  console.log(
    '\u001b[' + 33 + 'm' + `Visit ${process.env.BASE_URL}` + '\u001b[0m'
  );
});
