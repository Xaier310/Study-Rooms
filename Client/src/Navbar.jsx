import React, { useContext, useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import LogOut from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { AppContext } from "./App";

function Navbar() {
  const {
    prevRoomId,
    socket,
    curUser,
    setCurRoomId,
    curRoomId,
  } = useContext(AppContext);
  const [isNavPopup, setIsNavPopup] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  const { user, isAuthenticated, isLoading } = useAuth0();
  let history = useHistory();

  const prevChatRoom = (e) => {
    e.preventDefault();
    if (curUser && prevRoomId !== "") {
      var obj = {
        roomId: prevRoomId,
        nickname: curUser.nickname,
        username: curUser.email,
        type: "oldRoom",
      };
      socket.emit("join_room", obj);
      socket.on("isJoined", (isValid) => {
        if (isValid) {
          setCurRoomId(prevRoomId);
          socket.emit("addUser", curUser);
          history.push("/chat-room");
        } else {
          setTimeout(() => {
            alert("Previous room has been removed");
          }, 1500);
        }
      });
    } else {
      setTimeout(() => {
        alert("No previous record found");
      }, 1500);
    }
  };

const navPopupFn=()=>{
  let temp = isNavPopup;
  setIsNavPopup(!isNavPopup);
  if(!temp){
    let ele = document.querySelector(".navbar-child-3");
    if(ele){
      ele.classList.add("navbar-popup-overlay-button-onclick");
    }
    document.getElementById("root").classList.add("noscroll");
  }
  else{
    let ele = document.querySelector(".navbar-child-3");
    if(ele){
      ele.classList.remove("navbar-popup-overlay-button-onclick");
    }
    document.getElementById("root").classList.remove("noscroll");
  }
}
window.addEventListener('resize', closePopup);
function closePopup(){
  setIsNavPopup(false);
}
  return (
    <>
    <div className="navbar">
      <div className="navbar-child-1">
        <div className="navbar-logo">
          <span className="navbar-logo-dot"></span>
          <h4
            onClick={() => {
              socket.emit("remove_me", curRoomId);
              history.push("/");
            }}
            className="navbar-logo-text"
          >
            StudyRoomz
          </h4>
        </div>
      </div>
      <ul className="navbar-items">
          <li className="navbar-item-1 navbar-item-cc">
            <a
              onClick={() => {
                socket.emit("remove_me", curRoomId);
                history.push("/home");
              }}
            >
              Home
            </a>
          </li>
          <li className="navbar-item-2 navbar-item-cc">
            <a onClick={prevChatRoom}>lastRoom</a>
          </li>
          <li className="navbar-item-3 navbar-item-cc">
            <a
              onClick={() => {
                socket.emit("remove_me", curRoomId);
                history.push("/about_us");
              }}
            >
              About
            </a>
          </li>
          <li className="navbar-item-4 navbar-item-cc">
            <a href="#contact-us-form">Contact</a>
          </li>
        </ul>
      <div className="navbar-child-2">
        {!isAuthenticated ? <LoginButton /> : <LogOut />}
      </div>
      <div className="navbar-child-3" onClick={()=>{
              navPopupFn();
      }}></div>
    </div>
    
    {isNavPopup&&
      <div id="navPopup" className="navbar-popup-overlay">
      <ul className="navbar-items">
          <li className="navbar-item-1 navbar-item-cc">
            <a
              onClick={(e) => {
                socket.emit("remove_me", curRoomId);
                history.push("/");
                navPopupFn();
              }}
            >
              Home
            </a>
          </li>
          <li className="navbar-item-2 navbar-item-cc">
            <a onClick={(e)=>{
              prevChatRoom(e);
              navPopupFn();}}>lastRoom</a>
          </li>
          <li className="navbar-item-3 navbar-item-cc">
            <a
              onClick={(e) => {
                socket.emit("remove_me", curRoomId);
                history.push("/about_us");
                navPopupFn();
              }}
            >
              About
            </a>
          </li>
          <li className="navbar-item-4 navbar-item-cc">
            <a href="#contact-us-form" onClick={(e) => {
                navPopupFn();
              }}>Contact</a>
          </li>
        </ul>
      <div className="navbar-child-2" onClick={(e) => {
                navPopupFn();
              }}>
        {!isAuthenticated ? <LoginButton /> : <LogOut />}
      </div>
      </div>
    }
      </>
  );
  {
    /* <button className="navbar-button">Create Account</button> */
  }
}
// className="navbar-popup-overlay"
export default Navbar;
