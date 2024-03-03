const cloudinary=require ("cloudinary")

cloudinary.config({
    cloud_name:"duku1ij6h",
    api_key:"292157636723965",
    api_secret:"OJNZmfqwHMo0HzviBUqGdaNa7EI",
})
const imageUploadController=async(req,res)=>{
    try{
const result= await cloudinary.uploader.upload(req.files.image.path)
res.json({
    url:result.secure_url,
    public_id:result.public_id,
})
    }
    catch(error){
      console.log(error);  
    }
}
module.exports={imageUploadController}