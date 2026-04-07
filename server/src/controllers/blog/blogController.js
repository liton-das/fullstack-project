const Blogs = require("../../models/Blogs")
const User = require("../../models/User")
const { uploadImage } = require("../../utility/cloudinary")
const slugGenerator = require("../../utility/slugGenerator")
const { responseHeader } = require("../../utility/utiliti")
const cloudinary = require('cloudinary').v2
// create blog controller 
const createBlogController = async(req,res)=>{
    const {title,content,tags} = req.body
    const authorId = req.user._id
    const bufferImg = req.file.buffer
    try {
        if(!authorId) return responseHeader.error(res,'You are not authorized user!',401)
        if(!title) return responseHeader.error(res,'Title field is required!',400)
        if(!content) return responseHeader.error(res,'Content field is required',400)
        const slug = slugGenerator(title)
        const existBlog = await Blogs.findOne({slug})
        
        if(existBlog) return responseHeader.error(res,'The blog title already exist!',400)
        if(!bufferImg) return responseHeader.error(res,'Blog image not found!',404)
        const avatar = await uploadImage('Blog-image',bufferImg)
        const blog = new Blogs({
            title,
            content,
            slug,
            author:authorId,
            tags:tags?tags.split(',').map((tag)=>tag.trim()):[],
            isActive: 'true' ? true : false,
            thumbnail: avatar
        })
        
        await blog.save()
        return responseHeader.success(res,'Blog created successfully',201)
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }

}
// update blog controller 
const updateBlogController = async(req,res)=>{
    try {
        const {title,content,tags} = req.body
        const currentUser = req.user._id
        const {id} = req.params
        const bufferImg = req.file.buffer
        if(!currentUser) return responseHeader.error(res,'Unauthorized user',401)
        const existBlog = await Blogs.findOne({_id:id,author:currentUser})
        if(!existBlog) return responseHeader.error(res,'Blog not exist!',404)
        const slug = slugGenerator(title)
        if(title) existBlog.title = title
        existBlog.slug = slug
        if(content) existBlog.content = content
        if(tags) existBlog.tags = tags ? tags.split(',').map((tag)=>tag.trim()) : existBlog.tags
        
        if(existBlog.thumbnail){
            const existImg = existBlog.thumbnail.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(`Blog-image/${existImg}`)
        }
        const thumbnailImg = await uploadImage('Blog-image',bufferImg)
        if(thumbnailImg) existBlog.thumbnail = thumbnailImg
        await existBlog.save()
        return responseHeader.success(res,'Blog updated successfully',200)
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }
}
// get all blogs controller 
const getAllBlogsController = async(req,res)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const totalCount = await Blogs.countDocuments()
    const totalUsers = await User.countDocuments()
    try {
        const allBlogs = await Blogs.find().sort({createdAt:-1}).limit(limit).skip(skip).populate('author comments','fullName role comment_body')
        const simplify = {
            data: allBlogs,
            totalUsers,
            pagination :{
                page,
                limit,
                totalItems:totalCount,
                totalPages:Math.ceil(totalCount/limit)
            }
        }
        return responseHeader.success(res,'success',200,simplify)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// get blog by slug
const getBlogBySlug = async(req,res)=>{
    try {
        const {slug}=req.params
        if(!slug) return responseHeader.error(res,'Blog not found!',404)
        const blog = await Blogs.findOne({slug}).populate('author comments','fullName role avatar comment_body').select('-isActive -__v')
        if(!blog) return responseHeader.error(res,'This blog not exist!',404)
        return responseHeader.success(res,'success',200,blog)

    } catch (e) {
        return responseHeader.error(res)
    }
}
// get single blog controller 
const getSingleBlogController = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const totalCount = await Blogs.countDocuments()
        const blog = await Blogs.find({author:req.user._id}).sort({createdAt: -1}).limit(limit).skip(skip).populate('author comments','fullName role comment_body')
        const simplify = {
            data : blog,
            pagination: {
                page,
                limit,
                totalItems : totalCount,
                totalPages : Math.ceil(totalCount / limit)
            }
        }
        return responseHeader.success(res,'success',200,simplify)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// search terms 
const searchTermsController = async(req,res)=>{
    try {
        const {searchItems} = req.params
        const items = await Blogs.find({$or:[{title:{$regex:searchItems,$options:"i"}},{content:{$regex:searchItems,$options:"i"}},{slug:{$regex:searchItems,$options:"i"}}]}).populate('author','fullName role')
        return responseHeader.success(res,'success',200,items)
    } catch (e) {
        console.log(e)
       return responseHeader.error(res) 
    }
}
// delete single blog controller
const deleteSingleBlogController = async(req,res)=>{
    const {id}=req.params
    try {
        const existBlog = await Blogs.findOne({author:req.user._id})
        if(!existBlog) return responseHeader.error(res,'Blog not found!',404)
        if(existBlog.thumbnail){
            const existThumbnail = existBlog.thumbnail.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(`BlogForge/${existThumbnail}`)
        }
        await Blogs.findOneAndDelete({_id:id})
        return responseHeader.success(res,'Blog deleted successfully',200)
    } catch (e) {
        return responseHeader.error(res)
    }
}

module.exports = {
    createBlogController,
    getAllBlogsController,
    deleteSingleBlogController,
    getBlogBySlug,
    getSingleBlogController,
    searchTermsController,
    updateBlogController
}