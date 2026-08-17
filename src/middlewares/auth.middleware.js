const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create music or an album"
            });
        }

        req.user = decoded;

        next();
    } catch (err) {
        console.log(err.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

async function authUser(req, res, next){
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "user"){
            return res.status(403).json({message: "You dont have access"})
        } // This condition specifies that only user role can see all the songs not artist role
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = {
    authArtist,
    authUser
};
/* 
Above we created a middleware
Middleware can control the flow of execution of API's by Verifying
Middleware having multiple properties
some are in above userdefined middleware if it satisfies all the properties/conditions
then only flow is transfer to next otherwise it throws error that we mentioned in catch block.
We also can modify data inside request through middlewares
It also can send response
*/