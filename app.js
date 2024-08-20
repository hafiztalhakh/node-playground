const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const TODO_LIST = [];

/**
 * API to handle
 * the GET request for todo list
 */
app.get('/', function (request, response, next) {
  if (TODO_LIST.length > 0) {
    response.status(200).json({ list: TODO_LIST });
  } else {
    response
      .status(200)
      .json({ message: 'Todo list is empty.', list: TODO_LIST });
  }
});

/**
 * API to handle
 * the POST request for todo list
 */
app.post('/', function (request, response, next) {
  const item = request.body.item;
  if (item) {
    TODO_LIST.push(item);
    response.status(201).json({ message: 'Success' });
  } else {
    response.status(400).json({ message: 'Item is required for this action!' });
  }
});

const server = http.createServer(app);

// server.listen(8080)
server.listen(8080, () => {
  console.log('Server is Running');
});
