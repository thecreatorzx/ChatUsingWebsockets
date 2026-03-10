import { useEffect, useRef, useState } from 'react'
import PopUp from './components/popup'
import ChatWindow from './components/ChatWindow';
import { connectWS } from './ws';

function App() {
  const [username, setUsername] = useState("");
  const [userDef, setuserDef] = useState(false);

  const socket = useRef(null);
  
  useEffect(() => {
    socket.current = connectWS();

    
  }, [])


  return (
    <> 
      <div className="w-screen text-left h-screen flex justify-center text-gray-600 items-center bg-[#e0ded7]">
        {userDef?
        <ChatWindow
          username = {username}
        />:<PopUp
         username = {username} 
         setUsername= {setUsername} 
         setuserDef= {setuserDef}
         />}
      </div>
    </>
  )
}

export default App
