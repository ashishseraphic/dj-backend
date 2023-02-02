var axios = require('axios');


exports.postReq = async (token) => {
    console.log('check teh token first - ', token)
    try {
        const axiosRes = await axios({
            method: "post",
            url: process.env.FAREBASE_URL,
            data: { idToken: token.idToken, }
        });
        console.log('Here is the axios res - ', axiosRes.data)
        return axiosRes.data;
    } catch (err) {
        console.log('axios error response', err.response);
    }
    
}; 