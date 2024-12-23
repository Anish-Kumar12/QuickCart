const generateOtp = ()=>{
    return Math.floor(1000 + Math.random() * 900000) + 100000;
}

export default generateOtp