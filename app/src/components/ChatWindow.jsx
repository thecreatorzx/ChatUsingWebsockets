import React, { useEffect } from 'react'
import { useState, useRef } from 'react';

const ChatWindow = ({chats,setchats,username,socket}) => {
  const timer = useRef(null);
  const [input, setinput] = useState("")
  const [typers, setTypers] = useState([]);

  const handleKeyDown = (e) => {
    if(e.key == 'Enter') {
      sendMessage();
    }
  }


  const sendMessage = () => {
    const message = input.trim();
    if(!message) return;
    const date = new Date();
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const msg = {
        id: Date.now(),
        type: "message",
        sender: username,
        message,
        time
    }
    setchats((chats)=>[...chats, msg])
  socket.current.emit('chatMessage', msg)
  setinput("")
}
useEffect(()=> {
  socket.current.on('typing', (username) => {
    setTypers(prev=>{
      const isexist = prev.find((typer)=> typer === username)
      if(!isexist){
        return [...prev, username];
      }
      return prev;
    })
  })
  socket.current.on('stoptyping', (username) =>{
    setTypers((prev) => prev.filter((typer)=> typer!==username));
  })
  return () => {
    socket.current.off('typing')
    socket.current.off('stoptyping')
  }
},[])

useEffect(() => {
  if(input){
    socket.current.emit('typing', username);
    clearTimeout(timer.current);
  }
  timer.current = setTimeout(()=> {
  socket.current.emit('stoptyping', username);
  },1000);
  return () => {
    clearTimeout(timer.current);
  }
},[input,username])

  return (
    <div className='w-100 h-150 bg-white rounded-2xl shadow-lg'>
      <div className="top flex justify-between items-center border-b border-gray-300 p-3">
        <div className="left flex flex-row justify-center items-center">
          <i className='flex justify-center items-center text-white uppercase w-8 h-8 not-italic bg-green-600 border rounded-2xl'>{username[0]}</i>
          <span className='text-md font-semibold flex flex-col pl-2'>
            Realtime group chat
            {typers.length?<span className='font-normal text-sm'>{typers.join(', ')} is typing...</span>:null}
          </span>
        </div>
        <div className="right text-sm">
          Signed in as <i className='font-semibold'>{username}</i>
        </div>
      </div>
      <div className="chats h-120 flex flex-col p-4 bg-[#f5efe9] overflow-y-scroll">
        {chats.map(chat =>{return chat.type==="message"?(
          <span key = {chat.id} className={`w-full mb-1 flex ${chat.sender===username?"justify-end":"justify-start"}`}>
          <span className={`min-w-25 flex flex-col p-3 rounded-2xl ${chat.sender!=username?"bg-white":"bg-[#c5f0a8]"}`}>
          <div className="message text-sm">{chat.message}</div>
            <div className="w-full pt-2 flex flex-row justify-between name font-bold text-xs notita"><i>{chat.sender} </i><i className='font-medium not-italic text-gray-500 pl-4'>{chat.time}</i></div>
          </span>
        </span>):
        <div className="text-xs w-full text-center"><i className='text-sm font-semibold capitalize'>{chat.user}</i> joined the chat</div>
      })}
      </div>
      <div className="send flex pt-2 justify-evenly items-center">
        <input 
          className='flex justify-end items-center pb-1 px-3 w-75 h-9 border rounded-2xl'
          value = {input} placeholder='Message'
          onKeyDown={handleKeyDown}
          onChange={(e)=> setinput(e.target.value)}
        />
        <button className='text-md px-4 py-1.5 rounded-3xl cursor-pointer bg-green-600 text-white hover:bg-green-500 active:bg-green-700' onClick={()=> sendMessage()}>Send</button>
      </div>
    </div>
  )
}

export default ChatWindow