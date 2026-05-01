import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {

  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className='w-24 h-24 relative'>

      {/* background soft glow */}
      <div className="absolute inset-0 rounded-full bg-blue-50 blur-md opacity-60"></div>

      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "30px",

          // 🎨 changed to soft blue theme
          pathColor: "#4da3ff",
          textColor: "#1f2937",
          trailColor: "#e5e7eb",

          pathTransitionDuration: 0.5,
        })}
      />

      {/* small label */}
      <div className="text-center mt-2 text-xs text-gray-500">
        Time Left
      </div>

    </div>
  )
}

export default Timer