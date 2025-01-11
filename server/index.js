import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './dbconfig/dbconfig.js';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import uploadRouter from './routes/upload.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
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
app.use('/api/user',userRouter);
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)




connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})


