const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    },
    comment_body:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Approved','Pending'],
        default:'Pending'
    }
},{timestamps:true})
module.exports = mongoose.model('Comment',CommentSchema)