const db = require("../models");

//create model
const User = db.users;

//create user
const addUser = async (req, res) => {
  try {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const user = await User.create(newUser);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error adding user");
  }
};

//getAllUser
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error getting users");
  }
};

//getUser
const getUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error getting user");
  }
};

//updateUser
const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.update(req.body, { where: { id: id } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

//deleteUser
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.status(200).send("user is deleted!");
  } catch (error) {
    res.status(500).send("Error deletting user");
  }
};
module.exports = { addUser, getAllUsers, getUser, updateUser, deleteUser };
