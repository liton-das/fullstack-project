const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dazlaqw2c",
  api_key: "458562351659642",
  api_secret: "unEkLZS3_mJ476179jNXLxogN54", // Click 'View API Keys' above to copy your API secret
});
const uploadImage = async (folderName,bufferImg) => {
    const base64 = bufferImg.toString('base64')
    const dataURL = `data:image/jpeg;base64,${base64}`
    // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(dataURL, {
        folder:folderName,
        public_id: Date.now()
    })
    
    return uploadResult.secure_url
};
module.exports = {
    uploadImage
}