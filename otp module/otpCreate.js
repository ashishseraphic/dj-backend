

const generateOTP = () => {
    let string = '1234567890abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let otpCode = '';
    var len = string.length;

    for (var i = 0; i < 6; i++) {
        otpCode += string[Math.floor(Math.random() * len)];

    }
    // console.log(otpCode);

    return otpCode
}

module.exports = {generateOTP};
