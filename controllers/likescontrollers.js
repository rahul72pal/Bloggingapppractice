const Post = require("../models/postModel");
const Likes = require("../models/likeModel");

exports.likePost = async (req, res)=>{
    try{
    const {post , user} = req.body;

    // console.log(post);
    // console.log(user);
    
    const like = new Likes({post , user});

    const savedlike = await like.save();
    const updatedpost = await Post.findByIdAndUpdate(post, {$push: {likes : savedlike._id}} ,{new: true});

    res.json({
        post : updatedpost,
        message: "Like the post"
    });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            message: "Erorr in the lite of the post"
        })
    }
}

exports.unlikePost = async (req, res)=>{
    try{
    const {post , like} = req.body;

    // console.log(post);
    // console.log(user);
    
    // const like = new Likes({post , user});
    const deletedlike = await Likes.findOneAndDelete({post: post , _id: like});

    // const savedlike = await like.save();
    const updatedpost = await Post.findByIdAndUpdate(post, {$pull: {likes : deletedlike._id}} ,{new: true});

    res.json({
        post : updatedpost,
        message: "unLike the post"
    });
    }
    catch(e){
        return res.status(500).json({
            success: false,
            message: "Erorr in the ulike of the post"
        })
    }
}

