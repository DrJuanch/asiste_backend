const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
};

module.exports = {
    tokenSign,
    
}
