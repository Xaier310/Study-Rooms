import React, { useEffect, useState, useContext } from "react";
import { Redirect, Link, NavLink, useHistory } from "react-router-dom";
// import "./css/Home.css";
import firstImg from "./images/1.jpg";
import secondImg from "./images/1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "./App";
const Home = () => {
  const {
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
  } = useContext(AppContext);
  const [noOfPartInCR, setNoOfPartInCR] = useState([0, 0, 0, 0, 0]);
  const [isPopup, setIsPopup] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  var history = useHistory();
  let capacity = 15;

  function randomStr() {
    var ans = "";
    const arr =
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 6; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  const getCustomStats = async (str) => {
    await socket.emit("custom_stats", str);
    socket.on("your_custom_stats", (lengtharray) => {
      setNoOfPartInCR(lengtharray);
    });
  };

  const createRoom = (e) => {
    e.preventDefault();
    var RoomId = randomStr();
    setCurRoomId(RoomId);
    if (curUser) {
      var obj = {
        roomId: RoomId,
        nickname: curUser.nickname,
        username: curUser.email,
        type: "newRoom",
      };
      socket.emit("join_room", obj);
      setPrevRoomId(RoomId);
      socket.emit("addUser", curUser);
      history.push("/chat-room");
    } else {
      alertfn();
    }
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (inputRoomId !== "") {
      var obj = {
        roomId: inputRoomId,
        nickname: curUser.nickname,
        username: curUser.email,
        type: "oldRoom",
      };
      socket.emit("join_room", obj);
      socket.on("isJoined", (isValid) => {
        if (isValid) {
          setCurRoomId(inputRoomId);
          setPrevRoomId(inputRoomId);
          socket.emit("addUser", curUser);
          history.push("/chat-room");
        } else {
          setIsRoomIdValid(false);
          alertfn(null, "Invalid Room Id");
        }
      });
    } else {
      alertfn(null, "Invalid Room Id");
    }
  };

  const joinCustomRoom = (number) => {
    if (noOfPartInCR[number - 1] < capacity) {
      var roomid = "";
      if (isWD) roomid = `webroom${number}`;
      else if (isAD) roomid = `androidroom${number}`;
      else if (isML) roomid = `mlroom${number}`;
      setCurRoomId(roomid);
      setPrevRoomId(roomid);
      socket.emit("join_custom_room", roomid);
      socket.emit("addUser", curUser);
      history.push("/chat-room");
    } else {
      alertFnForPopup("This Room is already full try another one");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1300 });
    AOS.refresh();
  }, []);

  const alertfn = (e = null, str = "Please login first") => {
    var ele = document.querySelector(".alert");
    if (ele) ele.innerText = str;
    setTimeout(() => {
      ele.innerText = "";
    }, 2000);
  };
  const alertFnForPopup = (str = "Please login first") => {
    var ele = document.querySelector(".alertForPopup");
    if (ele) ele.innerText = str;
    setTimeout(() => {
      ele.innerText = "";
    }, 2000);
  };

  const popupItems = [];
  for (let i = 0; i < 5; i++) {
    if (isML)
      popupItems.push(
        isAuthenticated ? (
          <a
            className="no-of-rooms-row-room-cc"
            onClick={() => {
              joinCustomRoom(i + 1);
              noOfPartInCR[i] <= capacity && setIsML(false);
            }}
          >
            {noOfPartInCR[i]}
          </a>
        ) : (
          <a
            className="no-of-rooms-row-room-cc"
            onClick={() => {
              alertFnForPopup();
            }}
          >
            {noOfPartInCR[i]}
          </a>
        )
      );
    // participantsInCR.MlRoom[`mlroom${i+1}`]
    else if (isWD)
      popupItems.push(
        isAuthenticated ? (
          <a
            className="no-of-rooms-row-room-cc"
            onClick={() => {
              joinCustomRoom(i + 1);
              noOfPartInCR[i] <= capacity && setIsWD(false);
            }}
          >
            {noOfPartInCR[i]}
          </a>
        ) : (
          <a
            className="no-of-rooms-row-room-cc"
            onClick={() => {
              alertFnForPopup();
            }}
          >
            {noOfPartInCR[i]}
          </a>
        )
      );
    // participantsInCR.WebRoom[`webroom${i+1}`]
    else if (isAD)
      popupItems.push(
        isAuthenticated ? (
          <a
            className="no-of-rooms-row-room-cc"
            onClick={() => {
              joinCustomRoom(i + 1);
              noOfPartInCR[i] <= capacity && setIsAD(false);
            }}
          >
            {noOfPartInCR[i]}
          </a>
        ) : (
          <a
            className="no-of-rooms-row-room-cc"
            onClick={() => {
              alertFnForPopup();
            }}
          >
            {noOfPartInCR[i]}
          </a>
        )
      );
    // participantsInCR.AndroidRoom[`androidroom${i+1}`]
  }

  return (
    <>
      <div className="Home">
        <Navbar />
        <main className="main">
          <section className="main-part-1">
            <div className="main-part-1-left">
              <h1 className="main-part-1-left-heading">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
                tenetur.
              </h1>
              <p className="main-part-1-left-para">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                fuga sunt expedita officia doloribus ut repudiandae corporis
                porro, tempora optio maiores sint sequi ducimus nam molestiae
                eveniet ullam modi reiciendis tempore labore exercitationem
                itaque repellat necessitatibus asperiores?
              </p>
              <div className="main-part-1-left-buttons">
                <button
                  className="main-part-1-left-buttons-button-1 main-part-1-left-buttons-button-cc"
                  onClick={isAuthenticated ? createRoom : alertfn}
                >
                  Create Room
                </button>

                <button
                  className="main-part-1-left-buttons-button-2 main-part-1-left-buttons-button-cc"
                  onClick={() => setIsPopup(true)}
                >
                  <i className="fas fa-home"></i>Enter in a Room
                </button>

                {isPopup && (
                  <div
                    className="popup-roomid-input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        isAuthenticated ? joinRoom(e) : alertfn();
                      }
                    }}
                  >
                    <div className="popup-roomid-input-bg">
                      <h1>Enter Room ID</h1>
                      <div className="popup-roomid-input-bg-extra">
                        <input
                          placeholder="Enter room id . . ."
                          type="text"
                          onChange={(event) => {
                            setInputRoomId(event.target.value);
                          }}
                        />
                        <button
                          id="link"
                          onClick={isAuthenticated ? joinRoom : alertfn}
                        >
                          <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>

                      <div
                        onClick={() => setIsPopup(false)}
                        className="no-of-rooms-row-closeButton"
                      >
                        <i className="fas fa-times"></i>
                      </div>
                      <p className="alert"></p>
                    </div>
                  </div>
                )}

                <p className="alert"></p>
              </div>
            </div>
            <div className="main-part-1-right">
              {/* <img className="main-part-1-right-image" src={firstImg} alt="" /> */}
            </div>
          </section>
          <section className="main-part-2">
            <div className="main-part-2-left">
              <img className="main-part-2-left-img" src={secondImg} alt="" />
            </div>
            <div className="main-part-2-right" id="rooms">
              {(isML || isWD || isAD) && (
                <div className="no-of-rooms">
                  <div className="no-of-rooms-row">
                    {popupItems}
                    <span
                      onClick={isAuthenticated ? createRoom : alertFnForPopup}
                      className="no-of-rooms-row-room-cc"
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </span>
                    <div className="no-of-rooms-row-closeButton">
                      <i
                        className="fas fa-times"
                        onClick={() => {
                          setIsML(false);
                          setIsWD(false);
                          setIsAD(false);
                        }}
                      ></i>
                    </div>
                    <br />
                    <p className="alertForPopup"></p>
                  </div>
                </div>
              )}
              <h1 className="main-part-2-right-heading">
                Lorem ipsum dolor sit amet.
              </h1>
              <p className="main-part-2-right-para">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                fuga sunt expedita officia doloribus ut repudiandae corporis
                porro, tempora optio maiores sint sequi ducimus nam molestiae
                eveniet ullam modi reiciendis tempore labore exercitationem
                itaque repellat necessitatibus asperiores?
              </p>
              <div className="main-part-2-right-cards">
                <div className="main-part-2-right-cards-card-1 main-part-2-right-cards-card-cc">
                  <h1 className="main-part-2-right-cards-card-cc-heading-cc">
                    <i className="fab fa-js-square"></i>
                    <span>Web Development</span>
                  </h1>
                  <button
                    className="main-part-2-right-cards-card-cc-button-cc"
                    onClick={() => {
                      setIsWD(true);
                      getCustomStats("webroom");
                    }}
                  >
                    Join Room
                  </button>
                </div>
                <div className="main-part-2-right-cards-card-2 main-part-2-right-cards-card-cc">
                  <h1 className="main-part-2-right-cards-card-cc-heading-cc">
                    <i className="fab fa-apple"></i>
                    <span>App Development</span>
                  </h1>
                  <button
                    className="main-part-2-right-cards-card-cc-button-cc"
                    onClick={() => {
                      setIsAD(true);
                      getCustomStats("androidroom");
                    }}
                  >
                    Join Room
                  </button>
                </div>
                <div className="main-part-2-right-cards-card-3 main-part-2-right-cards-card-cc">
                  <h1 className="main-part-2-right-cards-card-cc-heading-cc">
                    <i className="fab fa-python"></i>
                    <span>Machine Learning</span>
                  </h1>
                  <button
                    className="main-part-2-right-cards-card-cc-button-cc"
                    onClick={() => {
                      setIsML(true);
                      getCustomStats("mlroom");
                    }}
                  >
                    Join Room
                  </button>
                </div>
                {/* <div className="main-part-2-right-cards-card-4 main-part-2-right-cards-card-cc">
        <h1 className="main-part-2-right-cards-card-cc-heading-cc">Random</h1>
        <button className="main-part-2-right-cards-card-cc-button-cc">Join Room</button>
        </div>     */}
              </div>
            </div>
          </section>
        </main>
        <footer className="footer"></footer>
      </div>
      <Footer />
    </>
  );
};

export default Home;
