const express = require("express");
const router = express.Router();

const {createComment,deleteComment} = require("../controllers/commentsControllers");
const {createPost,getallPost} = require("../controllers/postControllers");
const {likePost,unlikePost} = require("../controllers/likescontrollers");

router.post("/comments/delete", deleteComment);
router.post("/comments/create", createComment);
router.post("/post/create", createPost);
router.get("/getall", getallPost);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

module.exports = router;
