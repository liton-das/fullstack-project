const multer = require('multer')
const upload = multer()
const { createBlogController, getAllBlogsController, getBlogBySlug, getSingleBlogController, searchTermsController, updateBlogController } = require('../../controllers/blog/blogController')
const authMiddleware = require('../../middlewares/authMiddleware')
const { createCommentController, updateCommentController, deleteSingleComment, getCommentListsController } = require('../../controllers/blog/commentController')
const blogApi = require('express').Router()
blogApi.post('/v1/create-blog',authMiddleware,upload.single('thumbnail'),createBlogController)
blogApi.put('/v1/update-blog/:id',authMiddleware,upload.single('thumbnail'),updateBlogController)
blogApi.get('/v1/get-blog-lists',getAllBlogsController)
blogApi.get('/v1/single-blog',authMiddleware,getSingleBlogController)
blogApi.get('/v1/search-tarms/:searchItems',searchTermsController)
blogApi.get('/v1/read/:slug',getBlogBySlug)
// comments api
blogApi.post('/v1/create-comment/:id',authMiddleware,createCommentController)
blogApi.get('/v1/get-all-comments',authMiddleware,getCommentListsController)
blogApi.put('/v1/update-comment/:commentId',authMiddleware,updateCommentController)
blogApi.delete('/v1/delete-comment/:id',authMiddleware,deleteSingleComment)

module.exports=blogApi