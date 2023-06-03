const JWT = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = await req.header('auth-token');
    if(!token){
        res.status(401).json({ error: "Please authenticate using valid token" });
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

// var jwt = require('jsonwebtoken');


// const verifyToken = (req, res, next) => {
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }


// module.exports = verifyToken;

