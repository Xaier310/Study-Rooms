import { createContext, useEffect, useState } from "react";
// import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";
import RealChat from "./RealChat";
import "./css/Home.css";
import Navbar from "./Navbar";
import Home from "./Home";
import io from "socket.io-client";
// import Chat from "./Chat";
import axios from "axios";
import LoginButton from "./LoginButton";
import LogOut from "./LogoutButton";
import Loading from "./Loading";
import About from "./About";
import ProtectedRoute from "./ProtectedRoute";
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

var Rooms = {
  WebRoom: ["webroom1", "webroom2", "webroom3", "webroom4", "webroom4"],
  MlRoom: ["mlroom1", "mlroom2", "mlroom3", "mlroom4", "mlroom5"],
  AndroidRoom: [
    "androidroom1",
    "androidroom2",
    "androidroom3",
    "androidroom4",
    "androidroom5",
  ],
};

function App() {
  const [curUser, setCurUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isRoomIdValid, setIsRoomIdValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWD, setIsWD] = useState(false);
  const [isAD, setIsAD] = useState(false);
  const [isNewRoom, setIsNewRoom] = useState(false);
  const [isML, setIsML] = useState(false);
  const [curRoomId, setCurRoomId] = useState(null);
  const [allParticipants, setAllParticipants] = useState([]);
  const [inputRoomId, setInputRoomId] = useState("");
  const [prevRoomId, setPrevRoomId] = useState("");
  const [participantsInCR, setparticipantsInCR] = useState({
    WebRoom: {
      webroom1: 1,
      webroom2: 0,
      webroom3: 0,
      webroom4: 2,
      webroom5: 0,
    },
    MlRoom: { mlroom1: 6, mlroom2: 9, mlroom3: 0, mlroom4: 0, mlroom5: 0 },
    AndroidRoom: {
      androidroom1: 0,
      androidroom2: 9,
      androidroom3: 0,
      androidroom4: 0,
      androidroom5: 0,
    },
  });

  useEffect(() => {
    user && setCurUser(user);
    // console.log(user);
  }, [user]);
  // const PORT = process.env.PORT || 3001;
  useEffect(() => {
    // setSocket(io(`http://localhost:3001`));
    setSocket(
      io("https://react-studyroom.herokuapp.com/", {
        transports: ["websocket"],
      })
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        socket,
        curUser,
        isRoomIdValid,
        setIsRoomIdValid,
        isLoggedIn,
        setIsLoggedIn,
        isWD,
        setIsWD,
        isAD,
        setIsAD,
        isML,
        setIsML,
        curRoomId,
        setCurRoomId,
        isNewRoom,
        setIsNewRoom,
        allParticipants,
        setAllParticipants,
        participantsInCR,
        setparticipantsInCR,
        inputRoomId,
        setInputRoomId,
        prevRoomId,
        setPrevRoomId,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={isLoading ? Loading : Home} />
          <Route path="/about_us" component={isLoading ? Loading : About} />
          <ProtectedRoute
            path="/chat-room"
            component={RealChat}
            isAuthenticated={isAuthenticated}
            curRoomId={curRoomId}
          />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
