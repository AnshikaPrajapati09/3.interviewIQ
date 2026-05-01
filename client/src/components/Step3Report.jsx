import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Preparing your report...</p>
      </div>
    );
  }

  const navigate = useNavigate()

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Strong performance overall.";
    shortTagline = "You handled questions confidently.";
  } else if (finalScore >= 5) {
    performanceText = "Average performance.";
    shortTagline = "Improve structure and clarity.";
  } else {
    performanceText = "Needs more practice.";
    shortTagline = "Focus on basics and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Interview Report", pageWidth / 2, currentY, { align: "center" });

    currentY += 15;

    doc.setFontSize(12);
    doc.text(`Final Score: ${finalScore}/10`, margin, currentY);

    currentY += 10;

    autoTable(doc, {
      startY: currentY,
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        i + 1,
        q.question,
        `${q.score}/10`,
        q.feedback
      ])
    });

    doc.save("report.pdf");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-4 sm:px-6 lg:px-10 py-8'>

      
      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

        <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
          <button
            onClick={() => navigate("/history")}
            className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
            <FaArrowLeft className='text-gray-700' />
          </button>

          <div>
            <h1 className='text-3xl font-semibold text-gray-800'>
              Interview Performance Report
            </h1>
            <p className='text-gray-500 mt-2'>
              Summary of your interview session
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md text-sm'>
          Download Report
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

    
        <div className='space-y-6'>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-md p-6 sm:p-8 text-center">

            <h3 className="text-gray-500 mb-4 text-sm">
              Overall Score
            </h3>

            <div className='relative w-24 h-24 mx-auto'>
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#2563eb",
                  textColor: "#1f2937",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>

            <p className="text-gray-400 mt-3 text-xs">
              evaluated out of 10
            </p>

            <div className="mt-4">
              <p className="font-medium text-gray-800 text-sm">
                {performanceText}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-3xl shadow-md p-6 sm:p-8'>

            <h3 className="text-sm font-semibold text-gray-700 mb-5">
              Skill Overview
            </h3>

            <div className='space-y-5'>
              {skills.map((s, i) => (
                <div key={i}>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>{s.label}</span>
                    <span className='font-medium text-blue-600'>{s.value}</span>
                  </div>

                  <div className='bg-gray-200 h-2 rounded-full mt-1'>
                    <div
                      className='bg-blue-500 h-full rounded-full'
                      style={{ width: `${s.value * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

       
        <div className='lg:col-span-2 space-y-6'>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-3xl shadow-md p-6'>

            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Score Trend per Question
            </h3>

            <div className='h-64'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#bfdbfe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-3xl shadow-md p-6'>

            <h3 className="text-sm font-semibold text-gray-700 mb-6">
              Question-wise Feedback
            </h3>

            <div className='space-y-6'>
              {questionWiseScore.map((q, i) => (
                <div key={i} className='bg-gray-50 p-5 rounded-2xl border'>

                  <div className='flex justify-between mb-3'>
                    <p className="text-xs text-gray-400">
                      Question {i + 1}
                    </p>

                    <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold'>
                      {q.score ?? 0}/10
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-800 mb-2">
                    {q.question}
                  </p>

                  <p className='text-sm text-gray-600'>
                    {q.feedback || "No feedback available"}
                  </p>

                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Step3Report