import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col'>
      <Navbar />

      <div className='flex-1 px-6 py-20'>
        <div className='max-w-6xl mx-auto'>

          {/* BADGE */}
          <div className='flex justify-center mb-6'>
            <div className='bg-white border border-gray-200 text-gray-600 text-sm px-5 py-2 rounded-full flex items-center gap-2 shadow-sm'>
              <HiSparkles size={16} className="text-blue-500" />
              AI Interview Practice Platform
            </div>
          </div>

        
          <div className='text-center mb-24'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-4xl md:text-5xl font-semibold text-gray-800'
            >
              Practice Interviews with{" "}
              <span className='text-blue-500 bg-blue-50 px-4 py-1 rounded-full'>
                AI Assistance
              </span>
            </motion.h1>

            <p className='text-gray-500 mt-6 max-w-2xl mx-auto'>
              Improve your communication, confidence, and technical skills with AI-powered mock interviews.
            </p>

            <div className='flex justify-center gap-4 mt-10'>
              <button
                onClick={() => {
                  if (!userData) return setShowAuth(true);
                  navigate("/interview")
                }}
                className='bg-gray-900 text-white px-8 py-3 rounded-full hover:opacity-90 transition'
              >
                Start Practice
              </button>

              <button
                onClick={() => {
                  if (!userData) return setShowAuth(true);
                  navigate("/history")
                }}
                className='border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-100 transition'
              >
                View History
              </button>
            </div>
          </div>

          
          <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-24'>
            {[
              {
                icon: <BsRobot size={24} />,
                step: "STEP 1",
                title: "Role Setup",
                desc: "Select your role & experience for customized interview."
              },
              {
                icon: <BsMic size={24} />,
                step: "STEP 2",
                title: "Voice Mode",
                desc: "Answer naturally using microphone like real interview."
              },
              {
                icon: <BsClock size={24} />,
                step: "STEP 3",
                title: "Timed Test",
                desc: "Practice under real interview time pressure."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0px 15px 35px rgba(59,130,246,0.12)"
                }}
                className='relative bg-white rounded-3xl border border-blue-100 p-9 w-80 shadow-sm transition-all duration-300'
              >
                <div className='absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-50 border border-blue-100 text-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center'>
                  {item.icon}
                </div>

                <div className='pt-10 text-center'>
                  <div className='text-xs text-blue-500 font-semibold tracking-widest mb-2'>
                    {item.step}
                  </div>

                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                    {item.title}
                  </h3>

                  <p className='text-sm text-gray-500'>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

         
          <div className='mb-28'>
            <h2 className='text-3xl font-semibold text-center mb-14 text-gray-800'>
              AI <span className="text-blue-500">Features</span>
            </h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {[
                { image: evalImg, icon: <BsBarChart />, title: "AI Evaluation", desc: "Scores communication & accuracy." },
                { image: resumeImg, icon: <BsFileEarmarkText />, title: "Resume Based Questions", desc: "AI-generated personalized questions." },
                { image: pdfImg, icon: <BsFileEarmarkText />, title: "PDF Report", desc: "Download detailed feedback report." },
                { image: analyticsImg, icon: <BsBarChart />, title: "Analytics", desc: "Track your performance growth." }
              ].map((item, index) => (
                <div key={index} className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition'>
                  <div className='flex flex-col md:flex-row items-center gap-8'>
                    
                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img src={item.image} className='max-h-64 object-contain' />
                    </div>

                    <div className='w-full md:w-1/2'>
                      <div className='w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4'>
                        {item.icon}
                      </div>

                      <h3 className='font-semibold text-gray-800 mb-2'>
                        {item.title}
                      </h3>

                      <p className='text-sm text-gray-500'>
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

         
          <div className='mb-24'>
            <h2 className='text-3xl font-semibold text-center mb-14 text-gray-800'>
              Interview <span className="text-blue-500">Modes</span>
            </h2>

            <div className='grid md:grid-cols-2 gap-8'>
              {[
                { img: hrImg, title: "HR Mode", desc: "Behavioral interview practice." },
                { img: techImg, title: "Technical Mode", desc: "Coding & technical questions." },
                { img: confidenceImg, title: "Confidence Check", desc: "Voice analysis insights." },
                { img: creditImg, title: "Credits System", desc: "Flexible interview access." }
              ].map((mode, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                  <div className='flex items-center justify-between'>
                    
                    <div className="w-1/2">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {mode.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {mode.desc}
                      </p>
                    </div>

                    <img src={mode.img} className="w-24 h-24 object-contain" />

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home