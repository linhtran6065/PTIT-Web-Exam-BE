const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
//create model
//const { User } = require("../models");
const models = require("../models");

//register
const register = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const alreadyExistUser = await models.user.findOne({ where: { email } });
    if (alreadyExistUser) {
      return res.json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    };
    const user = await models.user.create(newUser);
    const userData = { id: user.id, email, firstName, lastName };
    res.status(200).json({ message: "Register successfully", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error register user!" });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or Password does not match!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Email or Password does not match!" });
    }
    const accessToken = generalAccessToken(user);
    const refreshToken = generalRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      overwrite: true,
    });
    res.json({ accessToken, refreshToken });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

const generalAccessToken = (user) => {
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );
  return token;
};
const generalRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "100d",
    }
  );
  return token;
};

//refreshToken
const refreshToken = async (req, res) => {
  //const refreshToken = req.cookies.refreshToken;
  const refreshToken = req.header("Authorization");
  if (!refreshToken)
    return res.status(401).json({
      message: "Unauthenticated",
    });
  jwt.verify(
    refreshToken.split(" ")[1],
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        // res.status(403).json({ message: "Token is invalid" });
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({ message: "Token is expired" });
        } else {
          return res.status(403).json({ message: "Token is invalid" });
        }
      }
      if (user) {
        const newAccessToken = generalAccessToken(user);

        res.json({ accessToken: newAccessToken });
      }
    }
  );
};
//logout
const logOut = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out successfully!" });
};

module.exports = { register, login, refreshToken, logOut };
