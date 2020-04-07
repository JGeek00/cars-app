const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            result: 'fail',
            message: 'no-token'
        });
    }
    else {
        try {
            const decoded = jwt.verify(token, 'cars-app');
            req.user_token_id = decoded;
            next();
        } catch (error) {
            res.status(400).json({
                result: 'fail',
                message: 'no-token'
            });
        }
    }
}

module.exports = verifyToken;