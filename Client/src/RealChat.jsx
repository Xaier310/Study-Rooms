import React, { Component, useContext, useEffect, useState } from "react";
// import "./css/Home.css";
import Navbar from "./Navbar";
import AOS from "aos";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "./App";
import { useHistory } from "react-router-dom";

function RealChat() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {
    socket,
    curUser,
    curRoomId,
    allParticipants,
    setAllParticipants
  } = useContext(AppContext);

  const [currMsg, setCurrMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [isShowUsers,setIsShowUsers] = useState(false);
  var [LocalallParticipants, setLocalallParticipants] = useState([]);
  let history = useHistory();

  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);

  useEffect(() => {
    socket.emit("giveUsers", curRoomId);
    socket.on("getUsers", (obj) => {
      setAllParticipants(obj);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("give_roomUsers", curRoomId);
    socket.on("get_roomUsers", (users) => {
      var tempArray = [];
      // console.log("users : ",users.length);
      // console.log("participants: ",allParticipants.length);
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < allParticipants.length; j++) {
          if (allParticipants[j].socketid === users[i]) {
            tempArray.push(allParticipants[j].user);
          }
        }
      }

      setLocalallParticipants(tempArray);
    });
  }, [allParticipants]);

  useEffect(() => {}, [LocalallParticipants]);

  function getCurrTime() {
    let date = new Date(Date.now());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const addMsg = async (e) => {
    e.preventDefault();
    var inputMsg = "";
    if (document.getElementById("inputMsg"))
      inputMsg = document.getElementById("inputMsg").value;
    if (user && inputMsg !== "") {
      let message = {
        key: msgList.length + 1,
        msg: inputMsg,
        roomId: curRoomId,
        time: getCurrTime(),
        nickname: user.nickname,
        username: user.email,
      };
      await socket.emit("send_message", message);
      setCurrMsg("");
      let ele = document.getElementById("inputMsg");
      if (ele) ele.focus();
    } else {
      console.log("Warning! Something went wrong ");
    }
  };

  useEffect(() => {
    (async () => {
      await socket.on("receive_message", (message) => {
        if (!msgList.indexOf(message) > -1) {
          setMsgList((msg) => [...msg, message]);
          var objDiv = document.querySelector(".main-part-right-dm-p");
          var height = objDiv.scrollHeight;
          //   var objDiv = document.querySelector(".main-part-right").parentElement;
          //   objDiv.scrollTop = objDiv.scrollHeight;
          objDiv.scrollBy(0, height);
        } else {
          console.log("message already added");
        }
      });
    })();
  }, [socket]);

  // const loadFile = (e) => {
  //     var image = document.getElementById("output");
  //     var tgt = e.target || window.event.srcElement,
  //       files = tgt.files;
  //     if (FileReader && files && files.length) {
  //       var fr = new FileReader();
  //       fr.onload = async function () {
  //         // document.getElementById("output").src = fr.result;
  //         var img =  <img src={fr.result} className="loadedImg main-part-right-dm-msg-text" alt="img" />
  //         let message={
  //             key: msgList.length+1,
  //             msg:img,
  //             roomId: curRoomId,
  //             time: getCurrTime(),
  //             nickname: user.nickname,
  //             username: user.email
  //             }
  //         // setMsgList([...msgList,message]);
  //         // socket.emit("send_message",message);
  //         // console.log("msg : ",message);
  //       };
  //       fr.readAsDataURL(files[0]);
  //     }
  // }

const showUsers = ()=>{
  var ele = document.querySelector(".users-button");
  if(ele){
    setIsShowUsers(!isShowUsers);
    ele.classList.add("users-temp");
  }
}
window.addEventListener('resize', closePopup);
function closePopup(){
  setIsShowUsers(false);
}


  return (
    <>
      <div
        className="Chat"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addMsg(e);
          }
        }}
      >
        <div className="chat-navbar">
          <Navbar onClick={closePopup}/>
        </div>
        <h1 className="roomid">ROOM ID : {curRoomId}</h1>
        <main className="main">
          {!isShowUsers ?
          (<>
          <span className="users-button" onClick={showUsers}><i className="fas fa-angle-double-right"></i></span>
          </>
          ):(
          <>
          <section className="showUsers main-part-left">
          <span className="users-temp users-button" onClick={showUsers}><i className="fas fa-angle-double-left"></i></span>
            <div className="main-part-left-profile">
              <div className="main-part-left-profile-img">
                <img src={user.picture} alt="" />
              </div>
              <h4 className="main-part-left-profile-name">{user.nickname}</h4>
              <span className="main-part-left-profile-name-setting">
                <a
                  onClick={() => {
                    history.push("/home");
                    socket.emit("remove_me", curRoomId);
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </a>
              </span>
            </div>
            <div className="main-part-left-participants">
              {LocalallParticipants.map(
                (user) =>
                  user.email !== curUser.email && (
                    <div className="main-part-left-participants-participant-cc">
                      <img
                        className="main-part-left-participants-participant-cc-img"
                        src={user.picture}
                        alt=""
                      />
                      <h4 className="main-part-left-participants-participant-cc-name">
                        {user.nickname}
                      </h4>
                    </div>
                  )
              )}
            </div>
          </section>
          </>
          )
          }
          <section className="main-part-left">
            <div className="main-part-left-profile">
              <div className="main-part-left-profile-img">
                <img src={user.picture} alt="" />
              </div>
              <h4 className="main-part-left-profile-name">{user.nickname}</h4>
              <span className="main-part-left-profile-name-setting">
                <a
                  onClick={() => {
                    history.push("/home");
                    socket.emit("remove_me", curRoomId);
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </a>
              </span>
            </div>
            <div className="main-part-left-participants">
              {LocalallParticipants.map(
                (user) =>
                  user.email !== curUser.email && (
                    <div className="main-part-left-participants-participant-cc">
                      <img
                        className="main-part-left-participants-participant-cc-img"
                        src={user.picture}
                        alt=""
                      />
                      <h4 className="main-part-left-participants-participant-cc-name">
                        {user.nickname}
                      </h4>
                    </div>
                  )
              )}
            </div>
          </section>
          <section className="main-part-right">
            <div className="main-part-right-dm-p">
              {msgList&&msgList.map((msg) =>
                curUser.email === msg.username ? (
                  <div className="main-part-right-dm">
                    <div className="main-part-right-dm-msg myMsg" id="myMsg">
                      <p className="main-part-right-dm-msg-name">
                        {msg.nickname}
                      </p>
                      <p className="main-part-right-dm-msg-text">{msg.msg}</p>
                      <span className="main-part-right-dm-msg-time">
                        {msg.time}
                      </span>
                    </div>
                    <span></span>
                  </div>
                ) : (
                  <div className="main-part-right-dm" onClick={closePopup}>
                    <div className="main-part-right-dm-msg myMsg">
                      <p className="main-part-right-dm-msg-name">
                        {msg.nickname}
                      </p>
                      <p className="main-part-right-dm-msg-text">{msg.msg}</p>
                      <span className="main-part-right-dm-msg-time">
                        {msg.time}
                      </span>
                    </div>
                    <span></span>
                  </div>
                )
              )}
            </div>
            <div className="main-part-right-msgbox">
              <span className="main-part-right-msgbox-file">
                <input type="file" disabled />
              </span>
              <input
                id="inputMsg"
                value={currMsg}
                onChange={(e) => {
                  setCurrMsg(e.target.value);
                }}
                type="text"
                autocomplete="off"
                placeholder="Type a message"
                className="main-part-right-msgbox-typemsg"
              />
              <span className="main-part-right-msgbox-sendbutton">
                <i onClick={addMsg} className="fas fa-paper-plane"></i>
              </span>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default RealChat;







