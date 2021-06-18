import React,{useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'



import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import './Chat.css'
import TextContainer from '../TextContainer/TextContainer';


let socket ;
const ENDPIONT = 'http://localhost:3001';


const Chat = ({location}) => {   // location comes from react- router
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSend ,setIsSend ] = useState(false)
  


    useEffect(()=>{
        const {name , room}= queryString.parse(location.search);
        socket = io.connect(ENDPIONT)        
        
        setName(name)
        setRoom(room)

        if(name != null && room != null){           
            console.log(name,room)
        }
        socket.emit('join' , { name ,room });     
        socket.on('message',(message)=>{
            console.log(message)
        })
        return ()=>{
           socket.emit('discoonect');
           socket.off();
        }
    
        
    },[ENDPIONT , location.search])

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        setIsSend(true)
    
        if(message) {
          socket.emit('sendMessage', message);
        }
      }
    if(isSend){
      setMessage(message => '');
      setIsSend(false);
    }  



    return (
        <div className="outerContainer">
        <TextContainer  users={users}/>
        <div className="container">
            <InfoBar room={room} users={users} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    
     
      </div>
    )
}

export default Chat
