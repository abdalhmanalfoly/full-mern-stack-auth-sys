import User from "../models/user.model.js";

import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";

import {sendVerificationEmail, sendWelcomeEmail ,sendPasswordResetEmail , sendResetSuccessEmail} from "../mails/emails.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const signup = async (req, res) => {
    const { email, password, username, name } = req.body;
    try{if (!email || !password || !username || !name) {
        return res.status(400).send('All fields are required');
    };

    // Check if user already exists
    const useralreadyexist = await User.findOne({ email });

    if (useralreadyexist) {
        return res.status(400).send({success : false , message :'User already exists'});
    };

    // hash password => 67484878 == jkjh5745dfdfvf
    const hashedPassword = await bcrypt.hash(password,10);

    // verification token
    const verificationToken = generateVerificationCode();

    // create user
    const user = await User({
        email,
        password: hashedPassword,
        username,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,   // 24 hours
    });
    await user.save();

    //jwt token

    generateTokenAndSetCookie(res,user._id); 

    await sendVerificationEmail(user.email,verificationToken); // send verification email

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user:{
            ...user._doc,
            password:null
        }
    })

}catch(err){
        return res.status(400).send({success : false , message :err.message});
    };

};

export const verifyemail = async (req, res) => {
    // get the code==token from the request body
    const {code} = req.body;
    try {
        const user = await User.findOne({verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // check if the token is not expired
         })
        if (!user) {
            return res.status(400).send({success : false , message :'Invalid or expired verification code'});
        }
        user.isverified = true; 
    
        user.verificationToken = undefined; // remove the token from the user
        user.verificationTokenExpiresAt = undefined; // remove the token from the user
        await user.save(); 

        await sendWelcomeEmail(user.email , user.name) ;

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user:{
                ...user._doc,
                password:null
            }
        })


    }catch(err){
        console.log("verify email err")
        return res.status(400).send({success : false , message :err.message});
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        
                if (!user) {
                    return res.status(400).send({success : false , message :'Invalid password or email'});
                };

                const ispasswordmatched = await bcrypt.compare(password, user.password);
                if (!ispasswordmatched) {
                    return res.status(400).send({success : false , message :'Invalid password or email'});
                }

                generateTokenAndSetCookie(res,user._id);
                
                user.lastLogin = Date.now(); // update the last login time

                await user.save(); // save the user

                res.status(200).json({
                    success: true,
                    message: 'User logged in successfully',
                    user:{
                        ...user._doc,
                        password:null + " "+ "for security reasons"
                    }
                });


        if (!email || !password) {
            return res.status(400).send('All fields are required');
        };

        // Check if user exists


    }catch(err){
        return res.status(400).send({success : false , message :err.message});
    }

};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({success : false , message :'User not found'});
        };

        const resetTken = crypto.randomBytes(32).toString('hex');

        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hours

        user.resetPasswordToken = resetTken;
        
        user.resetPasswordExpiresAt = resetTokenExpiresAt; // set the token and the expires at time
        await user.save(); 


        //send the email
        const resetURL = `${process.env.CLIENT_URL}/${process.env.RESET_PASSWORD_URL}/${resetTken}`;
        await sendPasswordResetEmail(user.email,resetURL); // send verification email
        
        
        res.status(200).json({
            success: true,
            message: 'Password forget email sent successfully',
        });
    }catch(err){
        return res.status(400).send({success : false , message :err.message});
    }
   
};

export const resetPassword = async (req, res) => {
    try{ 
        const { token } = req.params; // get the token from the url
        const { password } = req.body; // get the password from the request body
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } }); // check if the token is valid and not expired
        if (!user) {
            return res.status(400).send({success : false , message :'Invalid or expired reset token'});
        };

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password
        user.password = hashedPassword; // set the new password
        user.resetPasswordToken = undefined; // remove the token from the user
        user.resetPasswordExpiresAt = undefined; // remove the token from the user

        await user.save(); 

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });

    
        }catch(err){
            return res.status(400).send({success : false , message :err.message});
        }

}


export const checkAuth = async (req, res) => {

    try{
        const user = await User.findById(req.userId).select('-password') // get the user id from the token

        if (!user) {
            return res.status(400).send({success : false , message :'User not found'});
        };
        res.status(200).json({
            success: true,
            message: 'User authenticated successfully',
            user:{
                ...user._doc,
                password:null
            }
        });
    }catch(err){
        console.log("check auth err" , err)
        return res.status(400).send({success : false , message :err.message});
    }
}

/*
*/