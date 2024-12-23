import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './dbconfig/dbconfig.js';
import userRouter from './routes/user.route.js';
dotenv.config();

const app = express();
app.use(cors({
    credentials : true,
    origin : process.env.DOMAIN
}));
app.use(express.json());
app.use(cookieParser())
app.use(morgan("combined")); 
app.use(helmet({
    crossOriginResourcePolicy : false
}))
const PORT = process.env.PORT
app.get("/",(request,response)=>{
    //server to client 
    response.json({
        message : "Server is Running" + PORT
    })
})
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
app.use('/api/user',userRouter);


