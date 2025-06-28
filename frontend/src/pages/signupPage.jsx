import React from 'react';
import { motion } from 'framer-motion';
import Input from '../components/input';
import {User,Mail, Key, Loader} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStronger from '../components/PasswordStronger';
import { useAuthStore } from '../store/authStore';


function SignupPage() {

    const [fullName, setFullName] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const {signup , error , isloading} = useAuthStore();

  const handelSignin = async (e) => {
    e.preventDefault();

    try{
      await signup(email,password,fullName,username);
      navigate('/verify-email');
    }
    catch(error) {
      console.error('Signup failed:', error);
  }
}
  return (
    <>
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter 
    backdrop-blur-xl rounded-2xl shadow-xl ovrerflow-hidden  '
    >
    <div className='p-8' >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text '>
            create your account
        </h2>

        <form onSubmit={handelSignin} >
          <Input 
            icon={User}
            type='text'
            placeholder='full name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            />
            <Input 
            icon={User}
            type='username'
            placeholder='uniqe username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
            />
            <Input 
            icon={Mail}
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
            />
            <Input 
            icon={Key}
            type='password'
            placeholder='password'
            value={password}  
            onChange={(e) => setpassword(e.target.value)}
            />
            {error && (
              <p className='text-red-500 font-semibold text-sm mt-2'>
                {error}
              </p>
            ) }
        {/*pasword stringth tire*/}
        <PasswordStronger password={password} />

        <motion.button 
        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white 
        font-bold rounded-lg shadow-lg hover:from-orange-600
        hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        focus:ring-offset-gray-900 transition duration-200'
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type='submit'
        disabled={isloading}
        >
          {isloading ? <Loader className='animate-spin mx-auto 'size={24} /> : 'Sign Up'}
         </motion.button>
        </form>
    </div>
    <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-orange-400 hover:underline'>
						Login
					</Link>
				</p>
			</div>
    </motion.div>
    </>

  );
}

export default SignupPage;
