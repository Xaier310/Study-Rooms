import { createContext, useEffect, useState } from "react";
// import './App.css';
import io from "socket.io-client";
import Chat from "./Chat";
import axios from "axios";
import LoginButton from "./LoginButton";
import LogOut from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
export const AppContext = createContext(null);

// const socket = io("http://localhost:3001");
function randomStr() {
  var ans = "";
  const arr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 6; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};
var Rooms = { WebRoom: [], PythonRoom: [], AndroidRoom: [] };
const ids = [1, 2, 3, 4, 5];
function Web(id, name) {
  this.id = id;
  this.name = name;
  this.capacity = 15;
}
function Android(id, name) {
  this.id = id;
  this.name = name;
  this.capacity = 15;
}
function Python(id, name) {
  this.id = id;
  this.name = name;
  this.capacity = 15;
}
for (let i = 0; i < ids.length; i++) {
  var ele = new Web(i, `Room ${i + 1}`);
  Rooms["WebRoom"].push(ele);
}
for (let i = 0; i < ids.length; i++) {
  var ele = new Android(i, `Room ${i + 1}`);
  Rooms["AndroidRoom"].push(ele);
}
for (let i = 0; i < ids.length; i++) {
  var ele = new Python(i, `Room ${i + 1}`);
  Rooms["PythonRoom"].push(ele);
}
console.log(Rooms);
function App() {
  const [username, setUsername] = useState("");
  const [curUser, setCurUser] = useState(null);
  const [createRoomId, setCreateRoomId] = useState(randomStr());
  const [isRoomIdValid, setIsRoomIdValid] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    user && setCurUser(user);
    // console.log(user);
  }, [user]);
  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);
  useEffect(() => {
    curUser && socket.emit("addUser", curUser.nickname);
  }, [curUser, socket]);
  useEffect(() => {
    socket?.on("welcome", (msg) => {
      console.log(msg);
    });
    socket?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [socket]);
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
      {!isAuthenticated ? (
        <LoginButton></LoginButton>
      ) : (
        <div>
          <Profile /> <LogOut />
        </div>
      )}
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
