const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            result: 'fail',
            message: 'no-token'
        });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.AUTH_KEY);
            try {
                const userExists = await User.findById(decoded.id);
                if (userExists) {
                    req.user_token_id = decoded;
                    next();
                }
                else {
                    res.status(401).json({
                        result: 'fail',
                        message: 'no-token'
                    });
                }
            } catch (error) {
                res.status(401).json({
                    result: 'fail',
                    message: 'no-token'
                });
            }
            
        } catch (error) {
            res.status(400).json({
                result: 'fail',
                message: 'no-token'
            });
        }
    }
}

module.exports = verifyToken;