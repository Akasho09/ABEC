import { useEffect, useState } from 'react'

function App() {
  const [message , setmessage]=  useState("");
  const [m ,setm] = useState<string[]>([""])
  const [socket,setSocket] = useState<null | WebSocket>(null)

  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = ()=>{
      console.log("connected to ws")
      setSocket(socket)
    }

    socket.onmessage = (message)=>{
      setm((prevms)=>[...prevms, message.data]);
    }

    return ()=>{
      socket.close()
    }
  },[])
  if(!socket) {
    return  <div>Connecting  to web socket </div>
  }
  return (
    <>
    <input type="text" onChange={(e)=>{
      setmessage(e.target.value)
    }}/>
    <button onClick={()=>{
      socket?.send(message)
    }} >Submit</button>
    {m.map((a,i)=>(
      <div key={i}>{a}</div>
    ))}
    </>
  )
}

export default App
