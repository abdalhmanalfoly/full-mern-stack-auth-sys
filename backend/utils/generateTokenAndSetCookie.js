import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie =(res , userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '10d',
    });

    res.cookie('token', token, {
        httpOnly: true, //xss attacks 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', //CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 10 days
    });
    return token;
};

