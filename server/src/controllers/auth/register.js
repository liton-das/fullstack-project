const User = require("../../models/User");
const crypto = require('crypto')
const sendMailToUser = require("../../utility/mailer");
const mailTemplate = require("../../utility/mailTemplate");
const {
  accessTokenGenerator,
  refreshTokenGenerator,
  resetPasswordToken,
  verifyToken
} = require("../../utility/tokens");
const {
  responseHeader,
  passwordRegex,
  emailRegex,
  otpGenerator,
} = require("../../utility/utiliti");
const { uploadImage } = require("../../utility/cloudinary");
const cloudinary = require('cloudinary').v2
// register controller
const registerController = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    if (!fullName) return responseHeader.error(res, "fullName field is required!", 400);
    if (!emailRegex.test(email))
      return responseHeader.error(res, "please provide an valid email!", 400);
    if (!email) return responseHeader.error(res, "email field is required!", 400);
    if (!phone) return responseHeader.error(res, "phone field is required!", 400);
    if (phone > 8 && phone < 19)
      return responseHeader.error(res, "please provide an number 8 or 19 character", 400);
    if (!password) return responseHeader.error(res, "password field is required!", 400);
    if (!passwordRegex.test(password))
      return responseHeader.error(res, "please provide an strong password", 400);
    const existuser = await User.findOne({ email });
    if (existuser) return responseHeader.error(res, "User email already exist!", 400);
    const otp = otpGenerator();
    const user = new User({
      fullName,
      email,
      phone,
      password,
      otp,
      otpExpire: Date.now() + 60 * 1000,
    });
    await user.save();
    // send otp to mail
    sendMailToUser(email, "Otp send to your email", mailTemplate, fullName, otp, user.otpExpire);
    // send response 201
    return responseHeader.success(res, "Register successfully", 201);
  } catch (e) {
    console.log(e);
    return responseHeader.error(res);
  }
};
// verify otp controller
const verifyOtpController = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!emailRegex.test(email))
      return responseHeader.error(res, "please provide an valid email!", 400);
    if (!email) return responseHeader.error(res, "Email field is required!", 400);
    if (!otp) return responseHeader.error(res, "Otp field is required!", 400);
    const user = await User.findOne({ email, otp, otpExpire: { $gt: Date.now() } });
    if (!user) return responseHeader.error(res, "Invalid otp or expire otp!", 400);
    user.otp = null;
    user.otpExpire = null;
    user.isVerify = true;
    await user.save();
    return responseHeader.success(res, "Otp verifyed success", 200);
  } catch (e) {
    console.log(e);
    return responseHeader.error(res);
  }
};
// resend otp controller 
const resendOtpController=async(req,res)=>{
  try {
    const {email} = req.body
    if(!email) return responseHeader.error(res,'Email field is required!',400)
    if(!emailRegex.test(email)) return responseHeader.error(res,'Please provaide an valid email!',400)
    const existUser = await User.findOne({email})
    if(!existUser) return responseHeader.error(res,'This email not exist!',404)
    if(existUser.isVerify === true) return responseHeader.error(res,'You are already verifyed user!',400)
    const otp = otpGenerator()
    existUser.otp = otp
    existUser.otpExpire = Date.now() + 10 * 60 * 1000
    existUser.isVerify = false 
    await existUser.save()
    sendMailToUser(email,'Resend otp successfully',mailTemplate(existUser.fullName,otp,existUser.otpExpire))
    return responseHeader.success(res,'Resend otp success',201)
  } catch (e) {
    console.log(e)
    return responseHeader.error(res)
  }
}
// login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return responseHeader.error(res, "Invalid creadintials!", 400);
    if (!emailRegex.test(email)) return responseHeader.error(res, "Invalid creadintials!", 400);
    if (!password) return responseHeader.error(res, "Invalid creadintials!", 400);
    if (!passwordRegex.test(password))
      return responseHeader.error(res, "Invalid creadintials!", 400);
    const existUser = await User.findOne({ email });
    if (!existUser) return responseHeader.error(res, "This user email not exist!", 404);
    const isMatch = await existUser.verifyPassword(password);
    if (!isMatch) return responseHeader.error(res, "Password doesn't match ", 400);
    const accessToken = accessTokenGenerator(existUser._id, existUser.email, existUser.role);
    const refreshToken = refreshTokenGenerator(existUser._id, existUser.email, existUser.role);
    res
      .cookie("x-Acc_Token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .cookie("x-Ref_Token", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
    return responseHeader.success(res, "Login successfully", 200);
  } catch (e) {
    console.log(e);
    return responseHeader.error(res);
  }
};
// get user profile controller
const getUserProfile = async(req,res)=>{
    try {
        const totalUsers = await User.countDocuments()
        const user = await User.findById(req.user._id).select('fullName phone avatar role email createdAt updatedAt isVerify')
        if(!user) return responseHeader.error(res,'User not found!',404)
        return responseHeader.success(res,'success',200,{user,totalUsers})
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }
}
// get all users lists controller 
const getUserListsController = async(req,res)=>{
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit
  const totalCount = await User.countDocuments() 
  const authorId = req.user._id
  if(!authorId) return responseHeader.error(res,'UnAuthorized access!',401)
  try {
    const users = await User.find().limit(limit).skip(skip).sort({createdAt: -1})
    if(!users) return responseHeader.error(res,'User not found!',404)
    const simplify={
      data:users,
      pagination:{
        page,
        limit,
        totalItems:totalCount,
        totalPages:Math.ceil(totalCount / limit)
      }
    }
    return responseHeader.success(res,'All users data get successfully',200,simplify)
  } catch (e) {
    return responseHeader.error(res)
  }
}
// update user profile controller 
const updateUserProfileController = async(req,res)=>{
  try {
    // return console.log(req.user._id)
    const {fullName,phone} = req.body
    const bufferImg = req.file.buffer
    const existUser = await User.findById(req.user._id)
    if(!existUser) return responseHeader.error(res,'User not authorized!',401)
    if(existUser.avatar){
      const existImg = existUser.avatar.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`profile/${existImg}`)
    }
    const image = await uploadImage('profile',bufferImg)
    if(fullName) existUser.fullName = fullName
    if(phone) existUser.phone = phone
    if(existUser.avatar) existUser.avatar = image
    await existUser.save()
    return responseHeader.success(res,'User profile updated',200)
  } catch (e) {
    console.log(e)
    return responseHeader.error(res)
  }
}
// forgot password controller 
const forgotPasswordController = async(req,res)=>{
  const {email} = req.body
  try {
    if(!email) return responseHeader.error(res,'Email field is required!',400)
    if(!emailRegex.test(email)) return responseHeader.error(res,'Please provide an valid email!',400)
    const existUser = await User.findOne({email})
    if(!existUser) return responseHeader.error(res,'This email not exist!',404)
    const {resetPasswordLink,hashToken} = resetPasswordToken()
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetPasswordLink}`
    existUser.resetPasswordToken = hashToken
    existUser.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000
    await existUser.save()
    sendMailToUser(email,'Reset password link',mailTemplate,existUser.fullName,resetLink,existUser.resetPasswordTokenExpire)
    return responseHeader.success(res,'Password reset success',200)
  } catch (e) {
    return responseHeader.error(res)
  }
}
// resetPassword controller 
const resetPasswordController = async(req,res)=>{
  try {
    const {newPassword} = req.body
    const {passwordToken} = req.params
    if(!newPassword) return responseHeader.error(res,'New password field is required!',400)
    if(!passwordToken) return responseHeader.error(res,'password token not found!',404)
    const isValidToken = crypto.createHash('sha256').update(passwordToken).digest('hex')
    const existToken = await User.findOne({resetPasswordToken:isValidToken,resetPasswordTokenExpire:{$gt:Date.now()}})
    if(!existToken) return responseHeader.error(res,'Invalid reset password token or expire!',400)
    existToken.resetPasswordToken = null
    existToken.resetPasswordTokenExpire = null
    existToken.password = newPassword
    await existToken.save()
    return responseHeader.success(res,'Password reset successfully',200)
  } catch (e) {
    return responseHeader.error(res)
  }
}
// search user controller 
const searchUserController=async(req,res)=>{
  try {
    const {searchItems} = req.params
    const users = await User.find({$or:[{fullName:{$regex:searchItems,$options:"i"}}]})
    return responseHeader.success(res,'success',200,users)
  } catch (e) {
    return responseHeader.error(res)
  }
}
// refresh token controller 
const refreshTokenController = async(req,res)=>{
  try {
    const refreshToken = req.cookies["x-Ref_Token"]
    if(!refreshToken) return responseHeader.error(res,'Unauthorized access!',401)
    const decoded = verifyToken(refreshToken)
    if(!decoded) return responseHeader.error(res,'Unauthorized access!',401)
    const accessToken = refreshTokenGenerator(decoded._id,decoded.email,decoded.role)
    res.cookie("x-Acc_Token",accessToken,{
      httpOnly:true,
      secure:true
    })
    return responseHeader.success(res,'Access token refreshed successfully!',200)
  } catch (e) {
    return responseHeader.error(res)
  }
}
// logout controller 
const logOutController = async(req,res)=>{
  try {
    res.clearCookie('x-Acc_Token')
    res.clearCookie('x-Ref_Token')
    return responseHeader.success(res,'Logout successfully',200)
  } catch (e) {
    return responseHeader.error(res)
  }
}
module.exports = {
  registerController,
  verifyOtpController,
  resendOtpController,
  loginController,
  getUserProfile,
  forgotPasswordController,
  resetPasswordController,
  searchUserController,
  updateUserProfileController,
  refreshTokenController,
  logOutController,
  getUserListsController
};
