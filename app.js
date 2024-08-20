const http = require('http');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const { addTodoItem, getTodoList } = require('./controllers/todo');

const PORT = process.env.PORT || 8080;

/**
 * Creating express application
 */
const app = express();

app.use(express.json());
app.use(cors());

/**
 * Routes
 */
app.get('/', getTodoList);
app.post('/', addTodoItem);

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
server.listen(PORT, () => {
  console.log(`Server is Running on port: ${PORT}`);
});
