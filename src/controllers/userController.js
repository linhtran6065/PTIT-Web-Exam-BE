//const db = require("../models/");
//const { User } = require("../models/User.js"); //
//create model
//const User = db.users;

//create user
// const addUser = async (req, res) => {
// const hashedPassword = await bcrypt.hash(req.body.password, 10);
// try {
//   let newUser = {
//     email: req.body.email,//
//     password: hashedPassword,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//   };
//   const user = await User.create(newUser);
//   res.status(200).send(user);
// } catch (error) {
//   res.status(500).send("Error adding user");
// }
// };

//getAllUser
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({});
//     return res.status(200).send(users);
//   } catch (error) {
//     return res.status(500).send("Error getting users");
//   }
// };
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await models.user.findAll();
//     return res.status(200).json({ users });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

//getUser
// const getUser = async (req, res) => {
// try {
//   let id = req.params.id;
//   const user = await User.findOne({ where: { id: id } });
//   res.status(200).send(user);
// } catch (error) {
//   res.status(500).send("Error getting user");
// }
// };

// //updateUser
// const updateUser = async (req, res) => {
//   try {
//     let id = req.params.id;
//     const user = await User.update(req.body, { where: { id: id } });
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send("Error updating user");
//   }
// };

// //deleteUser
// const deleteUser = async (req, res) => {
//   try {
//     let id = req.params.id;
//     await User.destroy({ where: { id: id } });
//     res.status(200).send("user is deleted!");
//   } catch (error) {
//     res.status(500).send("Error deletting user");
//   }
// };

const bcrypt = require("bcrypt");
let self = {};
const models = require("../models");
self.getAll = async (req, res) => {
  try {
    let data = await models.user.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

self.createUser = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const alreadyExistUser = await models.user.findOne({ where: { email } });
    if (alreadyExistUser) {
      return res.json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const isAdminUpdated = req.body.isAdmin ? true : false;
    let newUser = {
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      isAdmin: isAdminUpdated,
    };
    const user = await models.user.create(newUser);
    const userData = {
      id: user.id,
      email,
      firstName,
      lastName,
      isAdmin: isAdminUpdated,
    };
    res
      .status(200)
      .json({ message: "Adding user successfully", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error adding user!" });
  }
};

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await models.user.findOne({ where: { id: id } });
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    };
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error getting user" });
  }
};

self.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let { password, ...others } = body;
    let data = await models.user.update(others, {
      where: {
        id: id,
      },
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No user updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `User with id=${id} updated`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
self.resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const user = await models.user.findOne({ where: { id: id } });
    if (!user) {
      return res.json({ message: "User is not exist!" });
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(200).json({ message: "Password does not match!" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let data = await models.user.update(
      { password: hashedPassword },
      {
        where: {
          id: id,
        },
      }
    );
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No user updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Password is updated`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await models.user.destroy({
      where: {
        id: id,
      },
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `User with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `User with id=${id} is not exist.`,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error,
    });
  }
};

self.deleteAll = async (req, res) => {
  try {
    let data = await models.user.destroy({
      where: {},
      truncate: true,
    });
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = self;
