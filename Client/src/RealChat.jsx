import React, { Component, useContext, useEffect, useState } from 'react';
import "./css/Home.css";
import Navbar from "./Navbar"
import AOS from "aos";
import profilePicture from "./images/profile-picture-2.jpg"


function RealChat(){
    useEffect(() => {
        AOS.init({duration : 1300});
        AOS.refresh();
        }, []);

var allParticipants =[];
var msgs=[];
for(let i =0;i<10;i++){
    msgs.push(
    <div className="main-part-right-dm">
    <div className="main-part-right-dm-msg myMsg">
        <p className='main-part-right-dm-msg-name'>Pradeep Vishwakarma</p>
        <p className="main-part-right-dm-msg-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam rerum qui dolorem doloribus! Ullam iure aperiam suscipit illo repellendus accusamus natus!</p>
        <span className="main-part-right-dm-msg-time">12:11 am</span>
    </div>
    <span></span>
    </div>
    );}


for(let i=0;i<10;i++){
    allParticipants.push(
        <div className="main-part-left-participants-participant-cc">
        <img className='main-part-left-participants-participant-cc-img' src={profilePicture} alt="" />
        <h4 className="main-part-left-participants-participant-cc-name">Amit Batra</h4>
        </div>
    );
}

return(<>
<div className="Chat">
<Navbar />
<main className="main">
    <section className="main-part-left">
       <div className="main-part-left-profile">
           <div className="main-part-left-profile-img"><img src={profilePicture} alt="" /></div>
        <h4 className="main-part-left-profile-name">Pradeep Vishwakarma</h4>
        <span className='main-part-left-profile-name-setting'>•</span>
       </div>
       <div className="main-part-left-participants">
          {allParticipants}
       </div>
    </section>
     <section className="main-part-right">
         <div className="main-part-right-dm-p">
             {msgs}
         </div>
         <div className="main-part-right-msgbox">
         <span className='main-part-right-msgbox-file'>
         <input type="file"/>
         </span>
          <input type="text" placeholder='Type a message' className="main-part-right-msgbox-typemsg" />
          <span className="main-part-right-msgbox-sendbutton">
          <i class="fas fa-paper-plane"></i>
          </span>
         </div>
     </section>
</main>
</div>
</>
    );


}

export default RealChat;