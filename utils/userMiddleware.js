const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function generateToken(user) {
	return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
	return jwt.verify(token, secretKey);
}

export { generateToken, verifyToken };
