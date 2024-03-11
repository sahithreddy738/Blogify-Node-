require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/userRouter");
const staticRouter = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const { checkAuthentication } = require("./middleware");
const blogRouter = require("./routes/blogRoute");
const app = express();
const port = process.env.PORT;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MongoDb Connected`))
  .catch((error) => console.log(error));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication("token"));
app.use(express.static(path.resolve("./public")));
app.use("/", staticRouter);
app.use("/user", router);
app.use("/blog",blogRouter);
app.listen(port, () => console.log(`server started at port ${port}`));
