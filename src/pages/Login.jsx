import React, { useState } from 'react'
import { UserData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading'

const Login = () => {
    const [email, setEmail] = useState("")
    const {loginUser, btnLoading} = UserData()

    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault();
        loginUser(email, navigate);
        
    }
  return (
<div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#0f2a36] to-[#163a46]">
  <form 
    action="" 
    className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 w-full md:w-[500px] transition-all duration-300 hover:border-white/50"
    onSubmit={submitHandler}
  >
    <h2 className="text-3xl mb-6 text-white font-bold text-center tracking-wide">Login</h2>

    <div className="mb-6">
      <label htmlFor="email" className="block text-gray-300 mb-2 text-lg">
        Email:
      </label>
      <input
        type="email"
        id="email"
        className="border border-white/30 bg-white/20 p-3 w-full rounded-lg outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="yourmail@example.com"
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

export default Login