const generateOtp = ()=>{
    return Math.floor(1000 + Math.random() * 900000) + 100000;
}

module.exports = generateOtp;