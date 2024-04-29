const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
require("dotenv").config();

const models = require("../models");
const { updateUser } = require("./UserController");

//register
const registerUser = async (req, res) => {
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
    res.status(200).json({ message: "Register successfully", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error register user!" });
  }
};

const registerStudent = async (req, res) => {
  try {
    const { email, firstName, lastName, msv } = req.body;

    const alreadyExistEmailStudent = await models.student.findOne({
      where: { email: email },
    });
    const alreadyExistMSVStudent = await models.student.findOne({
      where: { msv: msv },
    });

    if (alreadyExistEmailStudent || alreadyExistMSVStudent) {
      return res.json({ message: "Student already exists!" });
    }
    let newStudent = {
      msv: msv,
      email: email,
      firstName: firstName,
      lastName: lastName,
      class: req.body.class,
    };
    const student = await models.student.create(newStudent);
    res
      .status(200)
      .json({ message: "Register successfully", student: student });
  } catch (error) {
    res.status(500).json({ message: "Error register student!" });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ where: { email } });
    const student = await models.student.findOne({ where: { msv: password } });

    if (!user && (!student || student.email != email)) {
      return res.status(400).json({ message: "Account does not match!" });
    }

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch && !student) {
        return res
          .status(400)
          .json({ message: "Email or Password does not match!" });
      }
    }
    const targetEntity = user || student;
    const accessToken = generalAccessToken(targetEntity);
    const refreshToken = generalRefreshToken(targetEntity);

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

// const loginStudent = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const student = await models.student.findOne({ where: { msv: password } });
//     if (!student || student.email != email) {
//       return res.status(400).json({ message: "Account does not match!" });
//     }
//     const accessToken = generalAccessToken(student);
//     const refreshToken = generalRefreshToken(student);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       sameSite: "strict",
//       overwrite: true,
//     });
//     res.json({ accessToken, refreshToken });
//   } catch {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

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

const checkTokenExpired = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Token is missing in the request body" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(200)
          .json({ message: "Token is expired", isTokenExpired: true });
      } else {
        return res
          .status(403)
          .json({ message: "Token verification failed", error: err.message });
      }
    }
    const decodedToken = decoded;
    const currentTime = Math.floor(Date.now() / 1000);
    var isTokenExpired = decodedToken.exp < currentTime;

    return res.status(200).json({ isTokenExpired: isTokenExpired });
  });
};

module.exports = {
  registerUser,
  registerStudent,
  login,
  refreshToken,
  logOut,
  checkTokenExpired,
};
