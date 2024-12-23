import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
dotenv.config();
const generateRefreshToken = async (userID) => {
    const token =  await jwt.sign({ id : userID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    const updateRefreshToken = await UserModel.updateOne(
        { _id: userID },
        { $set: { refresh_token: token } }
    )
    if(updateRefreshToken){
        console.log("Refresh Token Updated")
    }
    return token;
}

export default generateRefreshToken;