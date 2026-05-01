import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-[#f4f4f4] flex justify-center px-4 pt-5'>
            
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='w-full max-w-6xl bg-white rounded-[18px] shadow-sm border border-gray-200 px-6 py-3 flex items-center justify-between'
            >

                {/* Left: Logo + Name */}
                <div className='flex items-center gap-2 cursor-pointer'>
                    <div className='bg-gray-900 text-white p-2 rounded-md'>
                        <BsRobot size={16} />
                    </div>
                    <h1 className='font-medium text-[16px] text-gray-800 hidden md:block'>
                        AI Interview
                    </h1>
                </div>

                {/* Right: grouped controls */}
                <div className='flex items-center gap-3'>

                    {/* Credits */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false)
                            }}
                            className='flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full text-sm border hover:bg-gray-200'
                        >
                            <BsCoin size={17} />
                            {userData?.credits || 0}
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-lg p-3 z-50'>
                                <p className='text-xs text-gray-600 mb-2'>
                                    Not enough credits?
                                </p>
                                <button
                                    onClick={() => navigate("/pricing")}
                                    className='w-full bg-gray-900 text-white py-1.5 rounded-md text-sm'
                                >
                                    Buy Credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className='h-6 w-[1px] bg-gray-300'></div>

                    {/* User */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }}
                            className='w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm'
                        >
                            {userData
                                ? userData?.name.slice(0, 1).toUpperCase()
                                : <FaUserAstronaut size={15} />}
                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-2 w-44 bg-white shadow-lg border border-gray-200 rounded-lg p-3 z-50'>
                                
                                <p className='text-sm text-gray-800 font-medium mb-1'>
                                    {userData?.name}
                                </p>

                                <button
                                    onClick={() => navigate("/history")}
                                    className='w-full text-left text-xs py-1.5 text-gray-600 hover:text-black'
                                >
                                    Interview History
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left text-xs py-1.5 flex items-center gap-2 text-red-500'
                                >
                                    <HiOutlineLogout size={14} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar