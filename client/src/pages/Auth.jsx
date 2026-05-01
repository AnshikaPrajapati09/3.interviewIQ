import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName
      let email = user.email

      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }

  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#eef2f7] flex items-center justify-center px-6 py-20"}
    `}>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
        className={`
          w-full 
          ${isModel ? "max-w-md p-7 rounded-2xl" : "max-w-lg p-10 rounded-3xl"}
          bg-white shadow-lg border border-gray-100
        `}
      >

        {/* Header */}
        <div className='flex items-center justify-center gap-3 mb-5'>
          <div className='bg-gray-900 text-white p-2 rounded-md'>
            <BsRobot size={16}/>
          </div>
          <h2 className='font-medium text-base text-gray-800'>
            Mock Interview AI
          </h2>
        </div>

        {/* Title */}
        <h1 className='text-2xl font-semibold text-center mb-3'>
          Continue to Dashboard
        </h1>

        {/* Subtitle */}
        <p className='text-gray-500 text-center text-sm mb-7'>
          Login to access your interview sessions and performance reports.
        </p>

        {/* Button */}
        <motion.button 
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className='w-full flex items-center justify-center gap-3 py-3 
          bg-gray-900 hover:bg-black text-white rounded-lg shadow-sm'>
          
          <FcGoogle size={20}/>
          Sign in with Google

        </motion.button>
      </motion.div>
    </div>
  )
}

export default Auth