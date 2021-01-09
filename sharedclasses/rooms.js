"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user = /** @class */ (function () {
    function user(name, media_id) {
        this.name = name;
        this.media_id = media_id;
    }
    return user;
}());
exports.user = user;
var room_class = /** @class */ (function () {
    function room_class(name) {
        this.members = [];
        this.room_id = name;
    }
    return room_class;
}());
exports.room_class = room_class;
function get_room_id(obj) {
    return obj.room_id;
}
exports.get_room_id = get_room_id;
function room_get_members(obj) {
    return obj.members;
}
exports.room_get_members = room_get_members;
function room_add_member(obj, member) {
    obj.members.push(member);
}
exports.room_add_member = room_add_member;
function room_remove_member(obj, member) {
    for (var x = 0; x < obj.members.length; x++) {
        if (member == obj.members[x].name) {
            obj.members.splice(x, 1);
        }
    }
}
exports.room_remove_member = room_remove_member;
function is_member_joined_room(obj, member_id) {
    var array = room_get_members(obj);
    for (var i = 0; i < array.length; i++) {
        if (array[i].name == member_id) {
            return true;
        }
    }
    return false;
}
exports.is_member_joined_room = is_member_joined_room;
var rooms_class = /** @class */ (function () {
    function rooms_class() {
        this.rooms = [];
    }
    return rooms_class;
}());
exports.rooms_class = rooms_class;
function get_rooms(obj) {
    //var rooms_list : string[] = [];
    //for(var i = 0; i < obj.rooms.length; i++){
    //rooms_list.push(obj.rooms[i].get_room_id());
    //rooms_list.push(get_room_id(obj.rooms[i]))
    //}
    return obj.rooms;
}
exports.get_rooms = get_rooms;
function get_members(obj, room_id) {
    var result = [];
    for (var i = 0; i < obj.rooms.length; i++) {
        if (get_room_id(obj.rooms[i]) == room_id) {
            result = room_get_members(obj.rooms[i]);
        }
    }
    return result;
}
exports.get_members = get_members;
function add_room(obj, name) {
    obj.rooms.push(new room_class(name));
}
exports.add_room = add_room;
function add_member(obj, name, media_id, room_id) {
    for (var i = 0; i < obj.rooms.length; i++) {
        if (get_room_id(obj.rooms[i]) == room_id) {
            room_add_member(obj.rooms[i], new user(name, media_id));
        }
    }
}
exports.add_member = add_member;
function remove_member(obj, name) {
    var array = get_rooms(obj);
    for (var i = 0; i < array.length; i++) {
        if (is_member_joined_room(array[i], name)) {
            room_remove_member(array[i], name);
        }
    }
}
exports.remove_member = remove_member;
function is_member_joined_rooms(obj, member_id) {
    var array = get_rooms(obj);
    for (var i = 0; i < array.length; i++) {
        if (is_member_joined_room(array[i], member_id)) {
            return true;
        }
    }
    return false;
}
exports.is_member_joined_rooms = is_member_joined_rooms;
function copy_rooms(objp, objc) {
    objp.rooms = objc.rooms.slice();
}
exports.copy_rooms = copy_rooms;
