import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Check for token in cookies or headers
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized no token provided' });
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized invalid token' });
        }
        req.userId = decoded.userId; 
        next(); 

    }catch(err){
        return res.status(401).json({success: false, message: 'Unauthorized'});
    }   
}