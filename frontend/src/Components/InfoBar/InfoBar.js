import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room ,users}) => {

  const sideBar =()=>{
      document.getElementById("sidebar").style.width = '250px';
  }

  const closeBar =()=>{
      document.getElementById("sidebar").style.width = "0";
  }

    return(
  <div className="infoBar">
   
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
      <div className="sidenav" id="sidebar">
        <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}}>
          <div style={{display:'flex',flexDirection:'column'}}>
          <h1>Members</h1> 
          <p>
          {
      users
        ? (
          <div>
           
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
          </p>
          </div>
        
       <span className="closebtn" onClick={closeBar}><img src={closeIcon} alt="close icon" /></span>
        </div>
       
       
      </div>
     
    </div>
    <div className="middleInnerContainer">
      <span onClick={sideBar}>Member</span>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

}

export default InfoBar;