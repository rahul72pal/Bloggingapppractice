const Post = require("../models/postModel");
const Comments = require("../models/commentModel");

exports.createComment = async(req, res)=>{
    try{
        const {post , user, body} = req.body;

        //create the new comments into the DB
        const comments = new Comments({
            post , user , body
        });
      
        //save the new comments into the DB
        const savedComment = await comments.save();

        //find the post by ID and update the and comment in its comments array
        const updatedPost = await Post.findByIdAndUpdate(post , {$push: {comments: savedComment._id}} , {new: true})
        .populate("comments")// this is use for populate over the commets arrays on Post
        .exec();

        res.json({
            success: true,
            post: updatedPost,
            message: "Updated successfully"
        });
    }
    catch(e){

        return res.status(500).json({
            success: false,
            message: "Erorr in the upadation of the comments"
        })
    }
}
exports.deleteComment = async(req, res)=>{
    try{
        const {post , comment} = req.body;
      
        const deletedcomment = await Comments.findOneAndDelete({post: post , _id: comment});

        //find the post by ID and update the and comment in its comments array
        const updatedPost = await Post.findByIdAndUpdate(post , {$pull: {comments: deletedcomment._id}} , {new: true})
        // .populate("comments")// this is use for populate over the commets arrays on Post
        // .exec();

        res.json({
            success: true,
            post: updatedPost,
            message: "delete comment successfully"
        });
    }
    catch(e){

        return res.status(500).json({
            success: false,
            message: "Erorr in the deleted commets of the comments"
        })
    }
}
