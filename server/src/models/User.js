const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        maxlength:30,
        minlength:2
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        requried:true,
        maxlength:19,
        minlength:8
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:null
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number,
        default:null
    },
    otpExpire:{
        type:Date,
        default:null
    },
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordTokenExpire:{
        type:Date,
        default:null
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

},{timestamps:true})
userSchema.pre('save',async function (){
    if(!this.isModified('password')) return
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    } catch (e) {
        throw new Error("Hash password error",e);
    }
})
userSchema.methods.verifyPassword = async function(enterPasword){
    return await bcrypt.compare(enterPasword,this.password)
}



module.exports = mongoose.model('User',userSchema)