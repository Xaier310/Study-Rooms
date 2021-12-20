import React, { Component, useContext, useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import LogOut from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { AppContext } from "./App";

function Navbar() {
  const {
    prevRoomId,
    setPrevRoomId,
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

  return (
    <div className="navbar">
      <div className="navbar-child-1">
        <div className="navbar-logo">
          <span className="navbar-logo-dot"></span>
          <h4
            onClick={() => {
              socket.emit("remove_me", curRoomId);
              history.push("/home");
            }}
            className="navbar-logo-text"
            data-aos="fade-zoom-in"
          >
            StudyRooms
          </h4>
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
              About Us
            </a>
          </li>
          <li className="navbar-item-4 navbar-item-cc">
            <a href="#contact-us-form">Contact us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-child-2">
        {!isAuthenticated ? <LoginButton /> : <LogOut />}
      </div>
    </div>
  );
  {
    /* <button className="navbar-button">Create Account</button> */
  }
}

export default Navbar;
