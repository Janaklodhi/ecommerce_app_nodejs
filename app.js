const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/images");
const commentRoutes = require("./routes/comments");

app.use(bodyParser.json());
app.use("/posts", postsRoutes);
app.use("/user", userRoutes);
app.use("/images", imageRoutes);
app.use("/comments/", commentRoutes);
app.use(express.static('./public'));
module.exports = app;