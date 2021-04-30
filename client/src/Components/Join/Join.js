import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

const Join = () => {
 
            const [name,setName] = useState('');
            const [room,setRoom] = useState('');

    const test=()=>{
        console.log('test')
    }

     
    return (
        <div className="joinOuterContainer">
           
            <div className="joinInnerContainer">
            <h1 className="heading">Join</h1>
                <div><input className="joinInput" placeholder="name" type='text' onChange={(event) => setName(event.target.value)} /></div>
                <div><input className="joinInput mt-20" placeholder="room" type='text' onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event=>(!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                  <button className="button mt-20 " type="submit" > Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
