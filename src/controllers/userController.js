const userService = require('../services/userService');

const getAllUsers = (req, res) => {
  const users = userService.getUsers();
  res.status(200).json(users);
};

const createUser = (req, res) => {
  const newUser = userService.addUser(req.body);
  res.status(201).json(newUser);
};

module.exports = { getAllUsers, createUser };
