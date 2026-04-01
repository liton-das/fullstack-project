const responseHeader = {
    success:(res,message='success',statusCode=200,data=null)=>{
        return res.status(statusCode).json({
            success:true,
            message,
            data
        })
    },
    error:(res,message='Internal server error',statusCode=500,errors=null)=>{
        return res.status(statusCode).json({
            success:false,
            message,
            errors
        })
    }
}

// password regex 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
// email regex 
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// generate otp 
const otpGenerator = ()=>{
    let digits = '0123456789'

    let len = digits.length
    let otp = ''
    for(let i=0;i<6;i++){
        otp += digits[Math.floor(Math.random() * len)]
    }
    return otp
}


module.exports = {
    responseHeader,
    passwordRegex,
    emailRegex,
    otpGenerator
}



