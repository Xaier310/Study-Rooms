import { createContext, useEffect, useState } from "react";
// import './App.css';
import io from "socket.io-client";
import Chat from "./Chat";
import axios from "axios";

export const AppContext = createContext(null);

const socket = io("http://localhost:3001");
function randomStr() {
  var ans = "";
  const arr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 6; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}
function App() {
  const [username, setUsername] = useState("");
  const [createRoomId, setCreateRoomId] = useState(randomStr());
  const [isRoomIdValid, setIsRoomIdValid] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [showChatRoom, setShowChatRoom] = useState(false);

  const createRoom = (e) => {
    e.preventDefault();
    if (username !== "") {
      var obj = {
        roomId: createRoomId,
        type: "newRoom",
      };
      socket.emit("join_room", obj);
      setShowChatRoom(true);
      setRoomId("");
    } else {
      var ele = document.querySelector("#error");
      if (ele) ele.innerHTML = "Invalid Username";
      setTimeout(() => {
        if (ele) ele.innerHTML = "";
      }, 3000);
    }
  };
  const joinRoom = (e) => {
    e.preventDefault();
    if (username !== "" && roomId !== "") {
      var obj = {
        roomId: roomId,
        type: "oldRoom",
      };
      socket.emit("join_room", obj);
      socket.on("isJoined", (isValidRoomId) => {
        if (isValidRoomId) {
          setShowChatRoom(true);
          setCreateRoomId("");
        } else {
          var ele = document.querySelector("#error");
          if (ele) ele.innerHTML = "Invalid Room ID";
          setTimeout(() => {
            if (ele) ele.innerHTML = "";
          }, 3000);
        }
      });
    } else {
      var ele = document.querySelector("#error");
      if (ele) ele.innerHTML = "Invalid Username or Room ID";
      setTimeout(() => {
        if (ele) ele.innerHTML = "";
      }, 3000);
    }
  };

  // useEffect(()=>{
  //   (async()=>{
  //     var obj = {
  //       roomId:createRoomId,
  //       type:"newRoom"
  //     }
  //     socket.emit("join_room",obj);
  //   })();
  // },[createRoomId]);

  return (
    <div className="App">
      {!showChatRoom ? (
        <>
          <form>
            <label>Username : </label>
            <input
              placeholder="jhon..."
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <label>Enter room code : </label>
            <input
              placeholder="abc123..."
              onChange={(event) => setRoomId(event.target.value)}
            />
            <button onClick={joinRoom}>Enter in room</button>
            <br />
            <button onClick={createRoom}>Create Room</button>
          </form>
          <p id="error"></p>
        </>
      ) : (
        <AppContext.Provider
          value={{ username, createRoomId, roomId, socket, setShowChatRoom }}
        >
          <Chat />
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
