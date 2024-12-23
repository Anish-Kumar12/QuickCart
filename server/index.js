const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./dbconfig/dbconfig');
dotenv.config();

const app = express();
app.use(cors({
    credentials: true,
    origin : process.env
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(helmet({
    crossOriginResourcePolicy : false
}))
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.json({
        message : "Server is running" + PORT
    })
})
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
