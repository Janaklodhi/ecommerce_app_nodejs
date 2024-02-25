const models = require("../models");
const checkAuth = require("../middleware/check-auth");

// creating the comment//
async function createComment(req, res){
  try {
    const postId = req.body.postId;
    console.log(postId);
    const content = req.body.content;
    const userId = req.userId;
    const post = await models.Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = await models.Comment.create({
      content,
      postId,
      userId,
    });
    return res.status(201).json(comment);
  } catch (error) {
    return handleInternalError(res, error);
  }
};

const handleInternalError = (res, error) => {
  console.error("Internal server error:", error);
  return res.status(500).json({ error: "Internal server error" });
};
 

// List of the user comments //
async function index(req, res) {
  try {
    const userId = req.userId;
    const comments = await models.Comment.findAll({
      where: { userId: userId }, // Filter by user ID
      include: [
        {
          model: models.User,
          as: "user",
        },
        {
          model: models.Post,
          as: "post",
        }
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!comments || comments.length === 0) {
      res.status(404).json({ error: "No comments found for the user" });
    } else {
      res.status(200).json(comments);
    }
  } catch (error) {
    return handleInternalError(res, error);
  }
}


async function update(req, res) {
  const userId = req.userId;
  const updateComment = {
    title: req.body.postId,
    content: req.body.content,
  };

  await models.Comment.update(updateComment, { where: { user_Id: userId } })
    .then((result) => {
      res.status(200).json({
        message: "post update successfully",
        post: updatePost,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "something went wrong",
        error: error,
      });
    });
}


async function destroy_comment(req, res) {
  const id = req.params.id;
  try {
    const comment = await models.Comment.findByPk(id);

    if (!comment) {
      res.status(404).json({ error: "comment not found" });
    } else {
      await comment.destroy();
      res.status(200).json({ message: "comment deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createComment,
  index,
  update,
  destroy_comment
};