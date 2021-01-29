import express from 'express';
//import * as socketio from 'socket.io';
const app = express();
//app.set("port", process.env.PORT || 3000);
var server = app.listen(3000)
const io = require("socket.io")(server, {
    cors: {
      origin: '*',
    }
  });
  import {  user, room, getRoomId, roomGetMembers, roomAddMember, roomRemoveMember, getRooms, getMembers, addRoom, addMember, removeMember, isMemberJoinedRooms, isMemberJoinedRoom } from "../sharedclasses/rooms"



//var io = socket(server)
//let http = require("http").Server(app);

//let io = require("socket.io")(app);
var rooms:room[] = []
addRoom(rooms, "domatio1")
addRoom(rooms, "domatio2")


console.log("o server anixe")

io.on("connection", function(socket: any)  {
    let curentUser:string;
    console.log("irthe")
    socket.join("main")
    
    socket.on('get_rooms', () => {
        
        
        socket.emit("get_rooms",rooms)
        
        
    });
    socket.on('room_enter', function(roomId: string, username:string, mediaId:string)  {
        if(isMemberJoinedRooms(rooms, username)){
            removeMember(rooms, username) 
        }
        addMember(rooms,username, mediaId, roomId)
        curentUser = username;
        console.log(username + "mpike sto domatio "+ roomId)
        console.log(getMembers(rooms, roomId))

        io.in("main").emit("rooms_update", rooms)
        
    })
    socket.on('room_leave', (room_id :string, username:string) => {
        
        removeMember(rooms, username)
        
        io.in("main").emit("rooms_update", rooms)
        
    })
    socket.on('disconnect', function() {
        removeMember(rooms, curentUser)
      });
    
    
});

