import { uploadImageCloudinary , deleteImageCloudinary} from "../utils/uploadImageCloudinary.js"

export const uploadImageController = async(request,response)=>{
    try {
        const file = request.file

        const uploadImage = await uploadImageCloudinary(file)

        return response.json({
            message : "Upload done",
            data : uploadImage,
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteImageController = async(request,response)=>{
    try {
        const {url} = request.body

        const publicIdMatch = url.match(/\/([^\/]+)\.[^\/]+$/);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if(!publicId){
            return response.status(400).json({
                message : "Invalid url",
                error : true,
                success : false
            })
        }
        const deleteImage = await deleteImageCloudinary(publicId)

        return response.json({
            message : "Image deleted",
            data : deleteImage,
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}