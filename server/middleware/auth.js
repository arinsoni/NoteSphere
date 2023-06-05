const JWT = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = await req.header('auth-token');
    if(!token){
        console.log("rbibfbsvfkvb")
        return res.status(401).json({ error: "Please authenticate using valid token" });
    }
    try {
        const data = JWT.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using valid token" });
    }
}

module.exports = verifyToken;
