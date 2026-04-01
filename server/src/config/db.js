const { default: mongoose } = require("mongoose")

const dbConnection = async()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/BlogForge?directConnection=true`)
        console.log(`db connected!`)
    } catch (e) {
        console.log('db not connected!',e)
    }
}
module.exports=dbConnection