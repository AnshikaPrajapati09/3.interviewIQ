import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='bg-[#f5f5f5] flex justify-center px-4 py-10'>
      
      <div className='w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-8'>
        
        {/* Top section */}
        <div className='flex flex-col items-center text-center mb-5'>
          
          <div className='flex items-center gap-2 mb-2'>
            <div className='bg-gray-900 text-white p-2 rounded-md'>
              <BsRobot size={15}/>
            </div>
            <h2 className='font-medium text-gray-800 text-[15px]'>
              AI Interview
            </h2>
          </div>

          <p className='text-gray-500 text-sm max-w-lg leading-relaxed'>
            Practice interviews with AI assistance to improve your confidence,
            communication skills and overall performance.
          </p>
        </div>

        {/* Divider */}
        <div className='w-full h-[1px] bg-gray-200 my-4'></div>

        {/* Bottom section */}
        <div className='text-center'>
          <p className='text-xs text-gray-400'>
            © 2026 AI Interview. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer