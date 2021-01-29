"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user = /** @class */ (function () {
    function user(name, mediaId) {
        this.name = name;
        this.mediaId = mediaId;
    }
    return user;
}());
exports.user = user;
var room = /** @class */ (function () {
    function room(name) {
        this.members = [];
        this.roomId = name;
    }
    return room;
}());
exports.room = room;
function getRoomId(obj) {
    return obj.roomId;
}
exports.getRoomId = getRoomId;
function roomGetMembers(obj) {
    return obj.members;
}
exports.roomGetMembers = roomGetMembers;
function roomAddMember(obj, member) {
    obj.members.push(member);
}
exports.roomAddMember = roomAddMember;
function roomRemoveMember(obj, member) {
    for (var x = 0; x < obj.members.length; x++) {
        if (member == obj.members[x].name) {
            obj.members.splice(x, 1);
        }
    }
}
exports.roomRemoveMember = roomRemoveMember;
function isMemberJoinedRoom(obj, member_id) {
    var array = roomGetMembers(obj);
    for (var i = 0; i < array.length; i++) {
        if (array[i].name == member_id) {
            return true;
        }
    }
    return false;
}
exports.isMemberJoinedRoom = isMemberJoinedRoom;
function getRooms(obj) {
    //var rooms_list : string[] = [];
    //for(var i = 0; i < obj.rooms.length; i++){
    //rooms_list.push(obj.rooms[i].get_room_id());
    //rooms_list.push(get_room_id(obj.rooms[i]))
    //}
    return obj;
}
exports.getRooms = getRooms;
function getMembers(rooms, room_id) {
    var result = [];
    for (var i = 0; i < rooms.length; i++) {
        if (getRoomId(rooms[i]) == room_id) {
            result = roomGetMembers(rooms[i]);
        }
    }
    return result;
}
exports.getMembers = getMembers;
function addRoom(rooms, name) {
    rooms.push(new room(name));
}
exports.addRoom = addRoom;
function addMember(rooms, name, media_id, room_id) {
    for (var i = 0; i < rooms.length; i++) {
        if (getRoomId(rooms[i]) == room_id) {
            roomAddMember(rooms[i], new user(name, media_id));
        }
    }
}
exports.addMember = addMember;
function removeMember(rooms, name) {
    var array = getRooms(rooms);
    for (var i = 0; i < array.length; i++) {
        if (isMemberJoinedRoom(array[i], name)) {
            roomRemoveMember(array[i], name);
        }
    }
}
exports.removeMember = removeMember;
function isMemberJoinedRooms(rooms, memberId) {
    var array = getRooms(rooms);
    for (var i = 0; i < array.length; i++) {
        if (isMemberJoinedRoom(array[i], memberId)) {
            return true;
        }
    }
    return false;
}
exports.isMemberJoinedRooms = isMemberJoinedRooms;
