"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import * as socketio from 'socket.io';
var app = express_1.default();
//app.set("port", process.env.PORT || 3000);
var server = app.listen(3000);
var io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
});
var rooms_1 = require("../sharedclasses/rooms");
//var io = socket(server)
//let http = require("http").Server(app);
//let io = require("socket.io")(app);
var rooms = new rooms_1.rooms_class();
rooms_1.add_room(rooms, "domatio1");
rooms_1.add_room(rooms, "domatio2");
rooms_1.add_member(rooms, "malakas", "asda", "domatio1");
rooms_1.add_member(rooms, "malakas2", "asda", "domatio1");
rooms_1.add_member(rooms, "malakas3", "asda", "domatio1");
rooms_1.remove_member(rooms, "malakas2");
console.log(rooms_1.is_member_joined_rooms(rooms, "malakas"));
console.log(rooms_1.get_members(rooms, "domatio1"));
io.on("connection", function (socket) {
    console.log("irthe");
    socket.join("main");
    socket.on('get_rooms', function () {
        socket.emit("get_rooms", rooms);
    });
    socket.on('room_enter', function (room_id, username, media_id) {
        if (rooms_1.is_member_joined_rooms(rooms, username)) {
            rooms_1.remove_member(rooms, username);
        }
        rooms_1.add_member(rooms, username, media_id, room_id);
        io.in("main").emit("rooms_update", rooms);
    });
    socket.on('room_leave', function (room_id, username) {
        rooms_1.remove_member(rooms, username);
        io.in("main").emit("rooms_update", rooms);
    });
});
