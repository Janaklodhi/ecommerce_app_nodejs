const express = require("express");
const commentsController = require("../controllers/comment.controller"); 
const router = express.Router();
const middleWare = require("../middleware/check-auth");

router.post("/", middleWare.checkAuth, commentsController.createComment);
router.get("/", middleWare.checkAuth, commentsController.index);
router.patch("/", middleWare.checkAuth, commentsController.update);
router.delete("/:id", middleWare.checkAuth, commentsController.destroy_comment);
module.exports = router;