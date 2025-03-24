import React from 'react'
import { ChatData } from '../context/ChatContext'

function Header() {
    const {chats} = ChatData()
  return (
    <div>
        <p className='text-lg mb-6'>Hello, how are you ?</p>
        {chats && chats.length === 0 && (<p className='text-lg mb-6'>Create New Chat here </p>)}
    </div>
  )
}

export default Header