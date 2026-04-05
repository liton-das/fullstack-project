const { default: mongoose } = require("mongoose")

const dbConnection = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}%401234@cluster0.veuvyaa.mongodb.net/${process.env.MONGO_DB_NAME}?appName=Cluster0`)
        console.log(`db connected!`)
    } catch (e) {
        console.log('db not connected!',e)
    }
}
module.exports=dbConnection