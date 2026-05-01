import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);
        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            )

            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }

            setLoading(false)
            onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4'>

            <div className='w-full max-w-6xl bg-white rounded-2xl shadow-md grid md:grid-cols-2 overflow-hidden'>

                {/* LEFT */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className='bg-blue-50/60 p-10 flex flex-col justify-center border-r border-blue-100'>

                    <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                        AI Interview Setup
                    </h2>

                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                        Create your personalized mock interview experience with AI-driven questions, voice interaction, and instant feedback.
                    </p>

                    <div className='space-y-4'>
                        {[
                            { icon: <FaUserTie />, text: "Role & Experience Setup" },
                            { icon: <FaMicrophoneAlt />, text: "Voice Based Interview Mode" },
                            { icon: <FaChartLine />, text: "Smart Performance Analysis" },
                        ].map((item, i) => (
                            <div key={i}
                                className='flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-4 py-3 text-sm text-gray-700 shadow-sm hover:scale-[1.02] transition'>
                                <span className='text-blue-400'>{item.icon}</span>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="p-10">

                    <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                        Interview Details
                    </h2>

                    <div className='space-y-5'>

                        {/* Role */}
                        <div className='relative'>
                            <FaUserTie className='absolute top-3.5 left-3 text-gray-400 text-sm' />
                            <input
                                type='text'
                                placeholder='Enter target role (e.g. Frontend Developer)'
                                className='w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-200 outline-none'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>

                        {/* Experience */}
                        <div className='relative'>
                            <FaBriefcase className='absolute top-3.5 left-3 text-gray-400 text-sm' />
                            <input
                                type='text'
                                placeholder='Experience (e.g. Fresher / 2 Years)'
                                className='w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-200 outline-none'
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </div>

                        {/* Mode */}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-2.5 px-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-200 outline-none'>
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* Resume Upload */}
                        {!analysisDone && (
                            <div
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border border-dashed border-blue-100 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50/40 transition'>

                                <FaFileUpload className='mx-auto text-2xl text-blue-300 mb-2' />

                                <input
                                    type="file"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <p className='text-xs text-gray-600'>
                                    {resumeFile ? resumeFile.name : "Upload resume (optional)"}
                                </p>

                                {resumeFile && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}
                                        className='mt-3 bg-blue-400 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Result */}
                        {analysisDone && (
                            <div className='bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-sm'>
                                <p className='font-medium text-gray-700 mb-2'>AI Insights</p>

                                {projects.length > 0 && (
                                    <ul className='list-disc pl-4 text-gray-600 mb-2'>
                                        {projects.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                )}

                                {skills.length > 0 && (
                                    <div className='flex flex-wrap gap-2'>
                                        {skills.map((s, i) => (
                                            <span key={i} className='bg-white border border-blue-100 px-2 py-1 rounded text-xs text-blue-500'>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            className='w-full bg-blue-300 hover:bg-blue-400 text-white py-2.5 rounded-lg text-sm font-medium transition'>
                            {loading ? "Preparing..." : "Start Interview"}
                        </button>

                    </div>
                </motion.div>

            </div>
        </motion.div>
    )
}

export default Step1SetUp