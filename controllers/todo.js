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

    // returning the response
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

    // returning the response
    return res.status(200).json({ list: todos });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

/**
 * API to handle
 * the PUT request for todo list item
 */
exports.updateTodoItem = async (req, res, next) => {
  try {
    const { content } = req.body;
    const itemId = req.params.id;
    await Todo.findByIdAndUpdate(itemId, { content });

    // returning the response
    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

/**
 * API to handle
 * the DELETE request for todo list item
 */
exports.deleteTodoItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      const error = new Error('Item ID is required');
      error.statusCode = 400;
      throw error;
    }

    await Todo.findByIdAndDelete(itemId);

    // returning the response
    return res.status(200).json({
      message: 'Item deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};
