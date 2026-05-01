import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Starter",
      price: "₹0",
      credits: 100,
      description: "Basic practice mode to start your interview journey.",
      features: [
        "100 Practice Credits",
        "Basic AI Feedback",
        "Voice Interview Access",
        "Limited History"
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Standard",
      price: "₹100",
      credits: 150,
      description: "Balanced plan for regular practice.",
      features: [
        "150 Interview Credits",
        "Detailed Feedback",
        "Performance Tracking",
        "Full History"
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹500",
      credits: 650,
      description: "Best for serious placement preparation.",
      features: [
        "650 Credits",
        "Advanced AI Feedback",
        "Skill Insights",
        "Priority Processing"
      ],
      badge: "Popular",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount,
        credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "AI Interview Prep",
        description: `${plan.name} Plan`,
        order_id: result.data.id,

        handler: async function (response) {
          const verifypay = await axios.post(
            ServerUrl + "/api/payment/verify",
            response,
            { withCredentials: true }
          )

          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉")
          navigate("/")
        },

        theme: {
          color: "#60a5fa",  
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null)
    } catch (error) {
      console.log(error)
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex items-center gap-4 mb-12">

        <button
          onClick={() => navigate("/")}
          className="p-3 rounded-xl bg-white shadow-sm border hover:shadow-md transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 mt-1">
            Simple pricing for your interview preparation journey
          </p>
        </div>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -5 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-2xl p-7 border transition-all
              ${isSelected
                  ? "bg-white border-blue-300 shadow-lg"
                  : "bg-white border-gray-200 shadow-sm"
                }
              ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              {plan.default && (
                <div className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              {/* title */}
              <h3 className="text-lg font-semibold text-gray-800">
                {plan.name}
              </h3>

              {/* price */}
              <div className="mt-3">
                <span className="text-3xl font-bold text-blue-500">
                  {plan.price}
                </span>
                <p className="text-sm text-gray-500">
                  {plan.credits} Credits
                </p>
              </div>

              {/* desc */}
              <p className="text-sm text-gray-500 mt-3">
                {plan.description}
              </p>

              {/* features */}
              <div className="mt-5 space-y-2">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-400 text-sm" />
                    <span className="text-sm text-gray-700">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* button */}
              {!plan.default && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isSelected) handlePayment(plan)
                    else setSelectedPlan(plan.id)
                  }}
                  disabled={loadingPlan === plan.id}
                  className={`w-full mt-6 py-2.5 rounded-xl text-sm font-semibold transition
                  ${isSelected
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}
                </button>
              )}

            </motion.div>
          )
        })}

      </div>
    </div>
  )
}

export default Pricing