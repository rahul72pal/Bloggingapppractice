// const Like = require("../models/likeModel");
// const Comments = require("../models/commentModel");
const Post = require("../models/postModel")

exports.createPost = async (req, res)=>{
    try{
        const {title , body } = req.body;
        const post = new Post({title, body});
        const savedpost = await post.save();

        res.json({
            post: savedpost
        });
    }
    catch(e){
      return res.status(400).json({
        success: false,
        message: "post is not created"
      })
    }
};

exports.getallPost = async(req, res)=>{
    try{
        const post = await Post.find()
        .populate("likes")
        .populate("comments").exec();

        res.json({
            posts : post,
        })
    }
    catch(e){
        return res.status(400).json({
            success: false,
            message: "all post is not fetched"
          })
    }
}