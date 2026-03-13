import React from 'react'
import { useState } from 'react'

const PopUp = ({chats, setchats, socket, setUsername, setuserDef}) => {
  const [inputName, setinputName] = useState("")
  const submitUsername = (e) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if(!trimmed) return;
    const date = new Date();
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const info = {id:Date.now(), type: "join", user: trimmed, time}
    socket.current.emit('joinRoom', info)
    setchats((chats)=>[...chats,info]);
    setUsername(trimmed);
    setuserDef(true);
  }
  return (
    <div className='w-90 p-4 rounded-2xl bg-white flex justify-center items-center border-2 border-purple-300 shadow-lg'>
      <form className='flex flex-col justify-evenly items-start
      ' onSubmit={submitUsername}>
        <h1 className='text-lg font-bold mb-0'>Enter Your Name </h1>
        <p className='text-xs  text-gray-400 italic mb-3'>Enter your name to start chatting. This will be used as username!</p>
        <input className="pl-4 mb-3 h-8 active: border rounded-2xl border-b border-gray-300" value = {inputName} onChange = {(e)=> setinputName(e.target.value)} id="name" type="text" />
        <button className='w-20 cursor-pointer text-white border-2 rounded-2xl border-purple-600 bg-violet-500 hover:bg-purple-400 active:bg-purple-500' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PopUp