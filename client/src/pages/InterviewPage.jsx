import React from 'react'
import { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'
import Step3Report from '../components/Step3Report'

function InterviewPage() {

  const [step, setStep] = useState(1)
  const [interviewData, setInterviewData] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">

      {/* soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]"></div>

      <div className="relative">

        {step === 1 && (
          <Step1SetUp
            onStart={(data) => {
              setInterviewData(data)
              setStep(2)
            }}
          />
        )}

        {step === 2 && (
          <Step2Interview
            interviewData={interviewData}
            onFinish={(report) => {
              setInterviewData(report)
              setStep(3)
            }}
          />
        )}

        {step === 3 && (
          <Step3Report report={interviewData} />
        )}

      </div>
    </div>
  )
}

export default InterviewPage