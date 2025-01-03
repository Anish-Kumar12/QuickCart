import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../dbconfig/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyTemplate.js";
import dotenv from "dotenv";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageClouninary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotpasswordtemplate.js";
dotenv.config();

export async function registerUserController(request,response){
    try {
        const { name, email , password } = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message : "provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.DOMAIN}/api/user/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from binkeyit",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function verifyEmailController(request,response){
    try{
        const {code} = request.query
        const user = await UserModel.findById(code)
        if(!user){
            return response.status(400).json({
                message : "Invalid user",
                error : true,
                success : false
            })
        }
        const updateUser = await UserModel.updateOne({_id : code},{
            verify_email : true
        })
        return response.json({
            message : "Email verified successfully",
            error : false,
            success : true,
            data : updateUser
        })
    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function loginController(request,response){
    try {
        const { email, password } = request.body

        if(!email || !password){
            return response.status(400).json({
                message : "provide email, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Invalid email",
                error : true,
                success : false
            })
        }
        if(user.status !=="Active"){
            return response.status(400).json({
                message : "Contact admin",
                error : true,
                success : false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return response.status(400).json({
                message : "Invalid password",
                error : true,
                success : false
            })
        }
        const accesstoken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookieOptions = {
            httpsOnly : true,
            secure : true,
            samesite : "None"
        }
        response.cookie("refreshtoken",refreshToken,cookieOptions)
        response.cookie("accesstoken",accesstoken,cookieOptions)

        return response.status(200).json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function logoutController(request,response){
    try{
        const userid = request.userId
        
        const cookieOptions = {
            httpsOnly : true,
            secure : true,
            samesite : "None"
        }
        response.clearCookie("refreshtoken",cookieOptions)
        response.clearCookie("accesstoken",cookieOptions)

        const removeRefreshToken = await UserModel.updateOne({_id : userid},{
            refresh_token : ""
        })

        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId;
        const image = request.file;

        if (!userId) {
            return response.status(400).json({
                message: "User ID is required",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const upload = await uploadImageCloudinary(image);

        user.avatar = upload.url;
        await user.save();

        return response.json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            data: {
                avatar: upload.url
            }
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile, password } = request.body 

        let hashPassword = ""

        if(password){
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
        })



        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function forgotPasswordController(request,response){
     try{
        const {email} = request.body
        const user = await UserModel.findOne({email})
        if(!user){
            return response.status(400).json({
                message : "Invalid email",
                error : true,
                success : false
            })
        }
        const otp = generateOtp()
        const expireTime = new Date().getTime() + 60 * 60 * 1000 
        const updateUser = await UserModel.findOneAndUpdate({email},{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo : email,
            subject : "Forgot password otp",
            html : forgotPasswordTemplate({user : user.name,otp : otp})
        })
        return response.json({
            message : "Otp sent successfully",
            error : false,
            success : true,
        })

     }
     catch(error){
         return response.status(500).json({
             message : error.message || error,
             error : true,
             success : false
         })
    }
 }
export async function verifyforgotpasswordotp(request,response){
    try{
        const {email,otp} = request.body
        if(!email || !otp){
            return response.status(400).json({
                message : "provide email, otp",
                error : true,
                success : false
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return response.status(400).json({
                message : "Invalid email",
                error : true,
                success : false
            })
        }
        if(user.forgot_password_otp !== otp){
            return response.status(400).json({
                message : "Invalid otp",
                error : true,
                success : false
            })
        }
        const currentTime = new Date().getTime()
        const otpExpiry = new Date(user.forgot_password_expiry).getTime()
        if(currentTime > otpExpiry){
            return response.status(400).json({
                message : "Otp expired",
                error : true,
                success : false
            })
        }
        return response.json({
            message : "Otp verified successfully",
            error : false,
            success : true,
            data : user._id
        })

    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function resetPasswordController(request,response){
    try{
        console.log("reset password",request.body)
        const {email,newPassword,confirmPassword} = request.body
        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "provide email, password, confirmpassword",
                error : true,
                success : false
            })
        }
        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "Password not match",
                error : true,
                success : false
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return response.status(400).json({
                message : "Invalid email",
                error : true,
                success : false
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword,salt)
        const updateUser = await UserModel.findOneAndUpdate({email},{
            password : hashPassword
        })
        return response.json({
            message : "Password reset successfully",
            error : false,
            success : true,
            data : updateUser
        })
    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export async function refreshTokenController(request,response){
    try{
        const refreshToken = request.cookies.refreshtoken || request?.headers?.authorization.split(" ")[1]
        if(!refreshToken){
            return response.status(400).json({
                message : "Please login",
                error : true,
                success : false
            })
        }
        const verifyToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        if(!verifyToken){
            return response.status(400).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }
        const newAccessToken = await generateAccessToken(verifyToken._id)
        response.cookie("accesstoken",newAccessToken,{
            httpOnly : true,
            secure : true,
            sameSite : "None"
        })

        return response.json({
            message : "Token refreshed successfully",
            error : false,
            success : true,
            data : {
                accesstoken : newAccessToken
            }
        })

    }
    catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}