// import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ChatData } from "../context/ChatContext";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";

function Sidebar({isOpen, toggleSidebar}) {
const {chats,  createChat, createLod, setselected, deleteChat} = ChatData()

const {logoutHandler} = UserData()

const deleteChatHandler = (id) =>{
    if(confirm("are you sure you want to delete this chat")){
        deleteChat(id)
    }
}

const clickEvent = (id) =>{
    setselected(id)
    toggleSidebar();
}
  return (
<div className={`fixed inset-0 bg-white/10 backdrop-blur-lg p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block border border-white/20 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

<button className="md:hidden p-2 mb-4 bg-white/20 rounded text-2xl text-cyan-400 hover:bg-white/30" onClick={toggleSidebar}>
  <IoIosCloseCircle />
</button>

<div className="text-2xl font-semibold mb-6 text-white tracking-wide">OblivionX</div>

<div className="mb-4">
  <button onClick={createChat} className="w-full py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white rounded shadow-md">
    {createLod ? <LoadingSpinner /> : "New Chat + "}
  </button>
</div>

<div>
  <p className="text-sm text-white/70 mb-2">Recent</p>
  <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
    {chats && chats.length > 0 ? (
      chats.map((e) => (
        <button
          key={e._id}
          className="w-full text-left py-2 px-2 bg-white/20 hover:bg-white/30 text-white rounded mt-2 flex justify-between items-center shadow-md"
          onClick={() => clickEvent(e._id)}
        >
          <span>{e.latestMessage.slice(0, 38)}...</span>
          <button
            onClick={() => deleteChatHandler(e._id)}
            className="bg-cyan-500 text-white text-xl px-3 py-2 rounded-md hover:bg-cyan-600 shadow-lg"
          >
            <MdDelete />
          </button>
        </button>
      ))
    ) : (
      <p className="text-gray-300">No Chats yet</p>
    )}
  </div>
</div>

<div className="absolute bottom-0 mb-6 w-full">
  <button onClick={logoutHandler} className="bg-cyan-600 text-white text-xl px-3 py-2 rounded-md hover:bg-cyan-700 shadow-lg">
    Logout
  </button>
</div>

</div>

  
  
  )
}

export default Sidebar