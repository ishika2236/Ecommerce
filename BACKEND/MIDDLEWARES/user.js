const jwt = require('jsonwebtoken');
const User = require('../Model/user');

const authenticateUser = async (req, res, next) => {
    // console.log('hello');
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secretKey'); // Ensure the secret key matches the one used for signing
        req.userId = decodedToken.userId;

        // Assuming user information is stored in the session
        req.session.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.log('Error authenticating user:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const authorizeUser = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            console.log(user,user.role)
            if (!user || user.role !== requiredRole) {
                return res.status(403).json({ error: 'Forbidden' });
            }
            next();
        } catch (error) {
            console.log('Error authorizing user:', error);
            res.status(500).json({ error: 'An error occurred while authorizing the user' });
        }
    };
};

module.exports = {
    authenticateUser,
    authorizeUser
};
