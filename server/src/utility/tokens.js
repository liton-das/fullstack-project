const jwt = require('jsonwebtoken')
const crypto = require('crypto');
// access token
const accessTokenGenerator = (_id,email,role)=>{
   return jwt.sign({
        _id,
        email,
        role
    },process.env.SECRET_KEY,{expiresIn:'1h'})
}
// refresh token
const refreshTokenGenerator = (_id,email,role)=>{
    return jwt.sign({
        _id,
        email,
        role
    },process.env.SECRET_KEY,{expiresIn:'6h'})
}
// Generate resetPassword token 
const resetPasswordToken = ()=>{
    const resetPasswordLink = crypto.randomBytes(16).toString('hex')
    const hashToken = crypto.createHash('sha256').update(resetPasswordLink).digest('hex')
    return {
        resetPasswordLink,
        hashToken
    }
}

// verifyToken 
const verifyToken = (token)=>{
    const isVerify = jwt.verify(token,process.env.SECRET_KEY)
    if(!isVerify) {
        console.log('jwt token verify error!')
    }
    return isVerify
}
module.exports ={
    accessTokenGenerator,
    refreshTokenGenerator,
    resetPasswordToken,
    verifyToken
}