const JWT = require('jsonwebtoken');
const cors = require('cors');

const verifyToken = async (req, res, next) => {
  const token = await req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = JWT.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:3000',
};

const corsMiddleware = cors(corsOptions);

module.exports = [corsMiddleware, verifyToken];
