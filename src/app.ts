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
  import { rooms_class, user, room_class, get_room_id, room_get_members, room_add_member, room_remove_member, get_rooms, get_members, add_room, add_member, remove_member, is_member_joined_rooms, is_member_joined_room } from "../sharedclasses/rooms"



//var io = socket(server)
//let http = require("http").Server(app);

//let io = require("socket.io")(app);
var rooms = new rooms_class();
add_room(rooms, "domatio1")
add_room(rooms, "domatio2")


console.log("o server anixe")

io.on("connection", function(socket: any)  {
    let curentUser:string;
    console.log("irthe")
    socket.join("main")
    
    socket.on('get_rooms', () => {
        
        
        socket.emit("get_rooms",rooms)
        
        
    });
    socket.on('room_enter', function(room_id: string, username:string, media_id:string)  {
        if(is_member_joined_rooms(rooms, username)){
            remove_member(rooms, username) 
        }
        add_member(rooms,username, media_id, room_id)
        curentUser = username;
        console.log(username + "mpike sto domatio "+ room_id)
        console.log(get_members(rooms, room_id))

        io.in("main").emit("rooms_update", rooms)
        
    })
    socket.on('room_leave', (room_id :string, username:string) => {
        
        remove_member(rooms, username)
        
        io.in("main").emit("rooms_update", rooms)
        
    })
    socket.on('disconnect', function() {
        remove_member(rooms, curentUser)
      });
    
    
});

