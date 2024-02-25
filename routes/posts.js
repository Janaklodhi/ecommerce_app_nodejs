const express = require("express");
const postsControllers = require("../controllers/post.controller");

const middleWare = require("../middleware/check-auth");
const router = express.Router();

router.post("/", middleWare.checkAuth, postsControllers.create);
router.get("/:id", postsControllers.show);
router.get("/", middleWare.checkAuth, postsControllers.index);
router.patch("/:id", middleWare.checkAuth, postsControllers.update);
router.delete("/:id", middleWare.checkAuth, postsControllers.destroy);
module.exports = router;