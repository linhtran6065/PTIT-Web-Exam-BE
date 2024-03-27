const express = require("express");
const cors = require("cors");
const app = express();

var corOptions = {
  origin: "http://localhost:8080",
};
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
const userRouter = require("./routes/UserRouter");

app.use("/api/users", userRouter);

//middleware
app.use(cors(corOptions));
app.use(express.json());

//test api
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//port
const port = process.env.PORT || 8080;

//server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
