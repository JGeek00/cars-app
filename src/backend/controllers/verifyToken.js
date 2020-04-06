const jwt = require('jsonwebtoken');

function verifyToken(req) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return false;
    }
    else {
        const decoded = jwt.verify(token, 'cars-app');
        const user_id = decoded.id;
        return user_id;
    }
}

module.exports = verifyToken;