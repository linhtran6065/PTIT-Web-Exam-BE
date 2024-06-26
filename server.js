const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const connectDB = require("./src/config/connectDB");
connectDB();
//router
const userRouter = require("./src/routes/userRouter");
const authRouter = require("./src/routes/AuthRouter");
const examRouter = require("./src/routes/examRouter");
const questionRouter = require("./src/routes/questionRouter");
const answerRouter = require("./src/routes/answerRouter");
const studentRouter = require("./src/routes/studentRouter");
const formRouter = require("./src/routes/formRouter");
const resultRouter = require("./src/routes/resultRouter");

const middlewareController = require("./src/controllers/middlewareController");

//middleware
//app.use(cors(corOptions));
var corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", middlewareController.verifyToken, userRouter);
app.use("/api/exams", middlewareController.verifyToken, examRouter);
app.use("/api/questions", middlewareController.verifyToken, questionRouter);
app.use("/api/answers", middlewareController.verifyToken, answerRouter);
app.use("/api/students", middlewareController.verifyToken, studentRouter);
app.use("/api/forms", middlewareController.verifyToken, formRouter);
app.use("/api/results", middlewareController.verifyToken, resultRouter);
app.use("/api", authRouter);

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
