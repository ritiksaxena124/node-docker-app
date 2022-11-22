const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getOnePost)
  .patch(protect, postController.updatePost)
  .post(protect, postController.deletePost);

module.exports = router;
