const users = [];

const getUsers = () => users;

const addUser = (user) => {
  users.push(user);
  return user;
};

module.exports = { getUsers, addUser };
