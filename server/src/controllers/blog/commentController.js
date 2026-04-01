const Blogs = require("../../models/Blogs")
const Comment = require("../../models/Comment")
const { responseHeader } = require("../../utility/utiliti")
// create comment controller
const createCommentController =async(req,res)=>{
    try {
        const {commentBody,status} = req.body
        const authorId = req.user._id
        const {id} = req.params
        if(!authorId) return responseHeader.error(res,'Unauthorized access!',401)
        if(!commentBody) return responseHeader.error(res,'comment body is required!',400)
        const blog = await Blogs.findById(id)
        if(!blog) return responseHeader.error(res,'Blog not exist!',404)
        const comment = new Comment({
            author:authorId,
            blogId:id,
            comment_body:commentBody,
            status
        })
        await comment.save()
        blog.comments.push(comment._id)
        await blog.save()
        return responseHeader.success(res,'Comment created successfully',201,comment)
    } catch (e) {
        console.log(e)
        return responseHeader.error(res,e.message || 'Internal server error')
    }
}
// update comment controller
const updateCommentController = async(req,res)=>{
    try {
        const {commentId} = req.params
        const authorId = req.user._id
        const {text,status} = req.body
        if(!authorId) return responseHeader.error(res,'UnAuthorized access!',404)
        const existComment = await Comment.findById(commentId)
        // check wonership id 
        if(existComment.author.toString() !== authorId.toString() ) return responseHeader.error(res,'Forbidden! You cannot edit this comment',403)
        if(text) existComment.comment_body = text
        if(status) existComment.status = status
        await existComment.save()
        return responseHeader.success(res,'Comment updated successfully',200,existComment)
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }
}
// get comment lists
const getCommentListsController =async(req,res)=>{
    const authorId = req.user._id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const totalCount = await Comment.countDocuments()
    if(!authorId) return responseHeader.error(res,'UnAuthorized Access!',401)
    try {
        const allComments = await Comment.find().limit(limit).skip(skip).sort({createdAt: -1}).populate('author blogId','fullName role avatar slug')
        const simplify ={
            data : allComments,
            pagination:{
                page,
                limit,
                totalItems:totalCount,
                totalPages:Math.ceil(totalCount / limit)
            }
        }
        return responseHeader.success(res,'All comments',200,simplify)
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }
}
// delete single comment 
const deleteSingleComment = async(req,res)=>{
    const {id} = req.params
    const authorId = req.user._id
    const existComment = await Comment.findById(id)
    if(existComment.author.toString() !== authorId.toString() ) return responseHeader.error(res,'Forbidden! you cannot delete this comment',403)
    await existComment.deleteOne()
    await Blogs.findOneAndUpdate(existComment.blogId,{
        $pull:{comments:existComment._id}
    }) 
    return responseHeader.success(res,'Comment deleted successfully',200)
}
module.exports ={
    createCommentController,
    updateCommentController,
    deleteSingleComment,
    getCommentListsController
}