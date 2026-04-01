const { default: mongoose, Schema } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    thumbnail:{
        type:String,
        default:null
    },
    tags:[
        {
            type:String,
            default:null
        }
    ],
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)