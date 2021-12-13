const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require('path');
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const roomRoute = require("./routes/rooms");
const makeChangesRoute = require("./routes/makechanges");
const fetchAllMsgsRoute = require("./routes/fetchmsgs");
const CircularJSON = require('circular-json');
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose.connect(
    // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@seniorcircle.z5ejt.mongodb.net/WasteTracker`,
    `mongodb://localhost:27017/ChatBot`,
    (err) => {
      if (err) throw err;
      console.log("DB Connected Successfully");
    }
  );

  app.use("/api/fetchallmsgs", fetchAllMsgsRoute);
  app.use("/api/rooms", roomRoute);
  app.use("/api/makechanges", makeChangesRoute);
  server.listen(3001,()=>{
    try{
     console.log("Backend server is running on port 3001");
    }catch(err){
    console.log(err);
    }   
});

function randomStr() {
  var ans = '';
  const arr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 6; i > 0; i--) {
      ans += 
        arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}

const io = new Server(server,{
    cors:{
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
    }
});
// io.sockets.adapter.rooms
io.on("connection",(socket)=>{
    console.log("connected User : ",socket.id);
    io.in(socket.id).socketsLeave(socket.id);

    socket.on("join_room",async (obj)=>{ 
      var rooms = io.sockets.adapter.rooms
      if(obj.type === "oldRoom"){
        if(rooms.has(obj.roomId)){
          await socket.join(obj.roomId);
          socket.emit("isJoined",true);
        }
          else{
          console.log("Room id is not valid");
          socket.emit("isJoined",false);
        }
      }
        else if(obj.type === "newRoom"){
          if(rooms.has(obj.roomId)){
            obj.roomId = randomStr();
          }
          await socket.join(obj.roomId);
          socket.emit("isJoined",true);
        }
        console.log("rooms : ", io.sockets.adapter.rooms);
    });
    socket.on("send_message",(msg)=>{
      console.log("send chlra hai");
      socket.to(msg.roomId).emit("receive_message",msg);
    });
    socket.on("disconnect",()=>{
        console.log("Disconnected User : ",socket.id);
        console.log("Remained rooms : ", io.sockets.adapter.rooms);
    });
});



