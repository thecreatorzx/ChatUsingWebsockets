import { useEffect, useRef, useState } from 'react'
import PopUp from './components/popup'
import ChatWindow from './components/ChatWindow';
import { connectWS } from './ws';

function App() {
  const [username, setUsername] = useState("");
  const [userDef, setuserDef] = useState(false);
  const [chats, setchats] = useState([]);
  const socket = useRef(null);
  
  useEffect(() => {
    socket.current = connectWS();
    socket.current.on('connect', ()=> {
      socket.current.on('roomNotice', (msg) => {
        setchats((chats)=> [...chats, {id: msg.id, type: msg.type, user: msg.user, time: msg.time}])
      }
      )
    })
    socket.current.on('chatMessage', (msg) => {
      //push to existing meessage list
      setchats(chats=>[...chats, {id: msg.id, type: msg.type, sender: msg.sender, message: msg.message, time: msg.time }])
    })
    return () => {
    socket.current.off('roomNotice')
    socket.current.off('chatMessage')
  }
  }, [])



  return (
    <> 
      <div className="w-screen text-left h-screen flex justify-center text-gray-600 items-center bg-[#e0ded7]">
        {userDef?
        <ChatWindow
          chats = {chats}
          setchats = {setchats}
          username = {username}
          socket = {socket}
        />:<PopUp
        chats = {chats}
        setchats = {setchats}
         socket = {socket}
         username = {username} 
         setUsername= {setUsername} 
         setuserDef= {setuserDef}
         />}
      </div>
    </>
  )
}

export default App
