import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { GiHamburgerMenu } from "react-icons/gi";
import Header from '../components/Header';
import { ChatData } from '../context/ChatContext';
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from '../components/Loading';
import { IoMdSend } from "react-icons/io";

function Home() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar  = () =>{
        setIsOpen(!isOpen)
    }

    const {fetchResponse, messages, prompt, setprompt, newRequestLoading, loading, chats} = ChatData()

    const submithandler = (e) =>{
        e.preventDefault()
        fetchResponse()
    }
    const messagecontainerRef = useRef()
    useEffect(()=>{
        if(messagecontainerRef.current){
            messagecontainerRef.current.scrollTo({
                top: messagecontainerRef.current.scrollHeight,
                behaviour: "smooth",
            })
        }
    },[messages])
  return (
<div className="flex h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] text-white backdrop-blur-xl">
  <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

  <div className="flex flex-1 flex-col">
    <button onClick={toggleSidebar} className="md:hidden p-4 bg-white/10 backdrop-blur-lg text-2xl rounded-md hover:bg-white/20 shadow-md">
      <GiHamburgerMenu />
    </button>

    <div className="flex-1 p-6 mb-20 md:mb-0">
      <Header />

      {loading ? (
        <LoadingBig />
      ) : (
        <div className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar" ref={messagecontainerRef}>
          {messages && messages.length > 0 ? (
            messages.map((e, i) => (
              <div key={i}>
                {/* User Message */}
                <div className="mb-4 p-4 rounded-xl bg-white/10 backdrop-blur-lg text-white flex gap-2 shadow-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="bg-white p-2 rounded-full text-black text-2xl h-10 shadow-lg">
                    <CgProfile />
                  </div>
                  {e.question}
                </div>

                {/* AI Response */}
                <div className="mb-4 p-4 rounded-xl bg-white/10 backdrop-blur-lg text-white flex gap-2 shadow-lg border border-teal-500/30 hover:border-teal-500/50 transition-all duration-300">
                  <div className="bg-white p-2 rounded-full text-black text-2xl h-10 shadow-lg">
                    <FaRobot />
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No Chat Yet</p>
          )}

          {newRequestLoading && <LoadingSmall />}
        </div>
      )}
    </div>
  </div>

  {chats && chats.length === 0 ? (
    ""
  ) : (
    <div className="fixed bottom-0 right-0 left-auto p-4 bg-white/10 backdrop-blur-lg w-full md:w-[75%] shadow-lg border border-white/20 hover:border-cyan-500/50 transition-all duration-300">
      <form onSubmit={submithandler} className="flex justify-center items-center">
        <input
          className="flex-grow p-4 bg-white/10 backdrop-blur-lg text-white outline-none rounded-l-lg border border-cyan-500/30 placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
          type="text"
          placeholder="Enter a Prompt here"
          value={prompt}
          onChange={(e) => setprompt(e.target.value)}
          required
        />
        <button className="p-4 bg-cyan-500 text-white text-2xl rounded-r-lg hover:bg-cyan-600 shadow-md transition-all duration-300">
          <IoMdSend />
        </button>
      </form>
    </div>
  )}
</div>



  )
}

export default Home