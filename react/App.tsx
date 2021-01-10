import * as React from "react";
import * as ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client'
import { rooms_class, user, room_class, get_room_id, room_get_members, room_add_member, room_remove_member, get_rooms, get_members, add_room, add_member, remove_member, copy_rooms }  from '../../librecord2//src/sharedclasses/rooms'
export interface myState {
  rooms: rooms_class
}
export const  App = () => {
  const [rooms, setRooms] = React.useState<rooms_class >(new rooms_class());
  
  
  
  
  React.useEffect(() => {
    
    console.log("ime malakas")
    const socket = io('http://localhost:3000')
    socket.emit('get_rooms')
    socket.on('get_rooms', (data: rooms_class)=> {
        //copy_rooms(rooms, data) 
       
      setRooms(data)
      
    })
        
      
    
    
  },[])
  const listItems = rooms.rooms.map((number) =>  <Room key={number.room_id} roomProp = {number} />);
  return (
    <ul>{listItems}</ul>
  );
}

export default App;

type RoomProps = {
  roomProp : room_class

}
export const Room = ({ roomProp }: RoomProps) => {
  const [room, setRoom] = React.useState<room_class >();
  React.useEffect(() => {
       
    setRoom(room)
    
    
  },[])
  const listItems = room_get_members(roomProp).map((member) =>  <li>{member.name}</li>);
  return (
    <div>
      <h1>{roomProp.room_id}</h1>
      <ul>{listItems}</ul>
    </div>
  );
}