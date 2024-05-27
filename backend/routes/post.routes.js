const Router = require("express");
const router = new Router();
const PostController = require("../controller/post.controller");

router.post("/createPost", PostController.createPost);
router.get("/post", PostController.getPost);
router.delete("/deletePost/:id", PostController.deletePost);
router.put("/updatePost/:id", PostController.updatePost);

module.exports = router;
