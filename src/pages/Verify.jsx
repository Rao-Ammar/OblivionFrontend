import React, { useState } from 'react'
import { UserData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'
import { ChatData } from '../context/ChatContext'

function Verify() {
    const [otp, setOtp] = useState("")

    const {verifyUser, btnLoading} = UserData()
    const { fetchChats} = ChatData()

    const navigate = useNavigate()
    
        const submitHandler = (e) =>{
            e.preventDefault();
            verifyUser(Number(otp), navigate, fetchChats);
            
        }
  return (
<div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#102a3e] to-[#1e3a46]">
  <form
    action=""
    className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 w-full md:w-[400px] transition-all duration-300 hover:border-white/50"
    onSubmit={submitHandler}
  >
    <h2 className="text-3xl mb-6 text-white font-bold text-center tracking-wide">Verify OTP</h2>
    
    <div className="mb-6">
      <label htmlFor="otp" className="block text-gray-300 mb-2 text-lg">
        Enter OTP:
      </label>
      <input
        type="number"
        id="otp"
        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 border border-white/30 text-center text-xl tracking-wider"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        placeholder="123456"
      />
    </div>

    <button
      className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 transition duration-200 shadow-xl hover:shadow-cyan-500/50 disabled:opacity-50"
      disabled={btnLoading}
    >
      {btnLoading ? <LoadingSpinner /> : "Submit"}
    </button>
  </form>
</div>



  )
}

export default Verify