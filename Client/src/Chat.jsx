import React, { Component, useContext, useEffect, useState } from 'react';
import "./css/Chat.css";
import {AppContext} from "./App"
import axios from "axios"

function getCurrTime() {
    let date = new Date(Date.now());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

function Chat(){
const {username, createRoomId, roomId,  socket, setShowChatRoom} = useContext(AppContext);
const [currMsg, setCurrMsg] = useState("");
const [msgList, setMsgList] = useState([]);
const [realRoomId, setRealRoomId] = useState("");

useEffect(()=>{ 
  roomId!==""?setRealRoomId(roomId):setRealRoomId(createRoomId); 
},[realRoomId]);

// var sendBtnn = document.getElementById("sendBtn");
// console.log(sendBtnn);
// sendBtnn.addEventListener("keydown", (e)=>{
//   if(e.key === "Enter"){
//     addMsg();
//   }
// });

const addMsg = async (e)=>{ 
e.preventDefault(); 
if(username!==""&&currMsg !== ""&&realRoomId !== ""){
    let message={
        key:msgList.length,
        msg:currMsg,
        roomId: realRoomId,
        time: getCurrTime(),
        username: username,
        }
    await socket.emit("send_message",message);
    setCurrMsg("");
}
}


useEffect(()=>{
  (async()=>{
  await socket.on("receive_message",(message)=>{
    setMsgList((msg)=>[...msg, message]);
    console.log("msgList2 : ",msgList);
    console.log("recieve chlra hai");
  });
  })();
},[socket]);

    return(
    <div>
    <h1 className='header'>
      LIVE CHAT
    </h1>    
    <div className='chats'>
      {msgList.map(msg=>username===msg.username?<div className='my'>{msg.msg}</div>:<div className='other'>{msg.msg}</div>)}
    </div>
    <form>
    <input type="text" value={currMsg} onChange={(event)=>{setCurrMsg(event.target.value);}} />
    <button id="sendBtn" onClick={addMsg} 
  //   onKeyPress={(event) => {
  // event.key === "Enter" && addMsg()}}
>send</button>
    </form>
    <h1 className='roomid'>Room Id : {realRoomId}</h1>
</div>
    );


}

export default Chat;