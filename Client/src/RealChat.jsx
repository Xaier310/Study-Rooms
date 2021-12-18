import React, { Component, useContext, useEffect, useState } from "react";
import "./css/Home.css";
import Navbar from "./Navbar";
import AOS from "aos";
import profilePicture from "./images/profile-picture-2.jpg";

function RealChat() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);
  const [msgs, setMsgs] = useState([]);
  var allParticipants = [];
  //   var msgs = [];
  //   useEffect(() => {
  //     const a = [];
  //     for (let i = 0; i < 10; i++) {
  //       a.push(
  //         <div className="main-part-right-dm">
  //           <div className="main-part-right-dm-msg myMsg">
  //             <p className="main-part-right-dm-msg-name">Pradeep Vishwakarma</p>
  //             <p className="main-part-right-dm-msg-text">
  //               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
  //               rerum qui dolorem doloribus! Ullam iure aperiam suscipit illo
  //               repellendus accusamus natus!
  //             </p>
  //             <span className="main-part-right-dm-msg-time">12:11 am</span>
  //           </div>
  //           <span></span>
  //         </div>
  //       );
  //       setMsgs(a);
  //     }
  //   }, [msgs]);
  for (let i = 0; i < 10; i++) {
    msgs.push(
      <div className="main-part-right-dm">
        <div className="main-part-right-dm-msg myMsg">
          <p className="main-part-right-dm-msg-name">Pradeep Vishwakarma</p>
          <p className="main-part-right-dm-msg-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
            rerum qui dolorem doloribus! Ullam iure aperiam suscipit illo
            repellendus accusamus natus!
          </p>
          <span className="main-part-right-dm-msg-time">12:11 am</span>
        </div>
        <span></span>
      </div>
    );
  }
  console.log(msgs);
  for (let i = 0; i < 10; i++) {
    allParticipants.push(
      <div className="main-part-left-participants-participant-cc">
        <img
          className="main-part-left-participants-participant-cc-img"
          src={profilePicture}
          alt=""
        />
        <h4 className="main-part-left-participants-participant-cc-name">
          Amit Batra
        </h4>
      </div>
    );
  }
  const scroll = (e) => {
    window.scrollTo(0, document.querySelector(".main-part-right").scrollHeight);
    var objDiv = e.target.parentElement;
    objDiv.scrollTop = objDiv.scrollHeight;
    // console.log(e);
  };
  const loadFile = (e) => {
    var image = document.getElementById("output");
    var tgt = e.target || window.event.srcElement,
      files = tgt.files;
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById("output").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }

    // image.src = URL.createObjectURL(e.target.files[0]);
    setMsgs((prevMsgs) => {
      return [
        ...prevMsgs,
        <div className="main-part-right-dm">
          <div className="main-part-right-dm-msg myMsg">
            <p className="main-part-right-dm-msg-name">Pradeep Vishwakarma</p>
            <img
              id="output"
              src={e.target.files[0]}
              className="main-part-right-dm-msg-text"
              alt="img"
            />
            <span className="main-part-right-dm-msg-time">12:11 am</span>
          </div>
          <span></span>
        </div>,
      ];
    });
  };
  return (
    <>
      <div className="Chat">
        <Navbar />
        <main className="main">
          <section className="main-part-left">
            <div className="room-name ">
              {/* <div className="main-part-left-profile-img">
                <img src={profilePicture} alt="" />
              </div> */}
              <h4 className="main-part-left-profile-name">
                Room Name:- WebDevelopment
              </h4>
              <span className="main-part-left-profile-name">/id</span>
            </div>
            <div className="main-part-left-profile">
              <div className="main-part-left-profile-img">
                <img src={profilePicture} alt="" />
              </div>
              <h4 className="main-part-left-profile-name">
                Pradeep Vishwakarma
              </h4>
              <span className="main-part-left-profile-name-setting">•</span>
            </div>
            <div className="main-part-left-participants">{allParticipants}</div>
          </section>
          <section onClick={scroll} className="main-part-right">
            <div className="main-part-right-dm-p">{msgs}</div>
            <div className="main-part-right-msgbox">
              <span className="main-part-right-msgbox-file">
                <div></div>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="file"
                  onChange={loadFile}
                />
              </span>
              <input
                type="text"
                placeholder="Type a message"
                className="main-part-right-msgbox-typemsg"
              />
              <span className="main-part-right-msgbox-sendbutton">
                <i className="fas fa-paper-plane"></i>
              </span>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default RealChat;
