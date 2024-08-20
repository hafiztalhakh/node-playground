const Todo = require('../models/TodoList');

/**
 * API to handle
 * the POST request for todo list
 */
exports.addTodoItem = async (req, res, next) => {
  try {
    const { content } = req.body;

    await Todo.create({
      content,
    });

    return res.status(201).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

/**
 * API to handle
 * the GET request for todo list
 */
exports.getTodoList = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort('-createdAt');
    return res.status(200).json({ list: todos });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};
