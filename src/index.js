const express = require("express");
const app = express();
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const uploadRouter = require("./routers/uploads");

const path = require("path");
// middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/uploads", uploadRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
