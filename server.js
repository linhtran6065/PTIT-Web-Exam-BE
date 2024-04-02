const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

var corOptions = {
  origin: "http://localhost:8080",
};
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const connectDB = require("./src/config/connectDB");
connectDB();
//router
const userRouter = require("./src/routes/userRouter");
const authRouter = require("./src/routes/authRouter");

const middlewareController = require("./src/controllers/middlewareController");

app.use("/api/users", middlewareController.verifyToken, userRouter);
app.use("/api", authRouter);
//middleware
app.use(cors(corOptions));
app.use(express.json());

//test api
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//port
const port = process.env.DB_PORT || 8080;

//server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
