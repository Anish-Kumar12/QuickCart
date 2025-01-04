import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET_KEY
});

const uploadImageCloudinary = async(image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : "binkeyit"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadImage
}

const deleteImageCloudinary = async (public_id) => {
    try {
        const deleteImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(`binkeyit/${public_id}`, (error, deleteResult) => {
                if (error) {
                    return reject(error);
                }
                return resolve(deleteResult);
            });
        });

        return deleteImage;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

export { uploadImageCloudinary, deleteImageCloudinary };