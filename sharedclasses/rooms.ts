export class user {
    name : string;
    mediaId : string;
    constructor(name : string, mediaId : string){
        this.name = name;
        this.mediaId = mediaId;

    }


}
export class room{
    roomId : string;
    members : user[] = [];
    constructor(name : string){
        this.roomId = name

    }

}
export function getRoomId(obj:room): string{
    return obj.roomId;

}
export function roomGetMembers(obj:room): user[]{
    return obj.members;

}
export function roomAddMember(obj:room,member : user): void{
    obj.members.push(member)

}
export function roomRemoveMember(obj:room,member : string){
    for(var x = 0; x < obj.members.length; x++){
        if(member==obj.members[x].name){ 
            
            obj.members.splice(x,1)   
        }
    }
}
export function  isMemberJoinedRoom(obj : room, member_id: string):boolean{
    let array:user[] = roomGetMembers(obj)
    for(let i = 0; i< array.length;i++){
        if(array[i].name == member_id){
            return true;
        }
    }
    return false; 

}


export function getRooms(obj:room[]): room[]{
    //var rooms_list : string[] = [];
    //for(var i = 0; i < obj.rooms.length; i++){
        //rooms_list.push(obj.rooms[i].get_room_id());
        //rooms_list.push(get_room_id(obj.rooms[i]))

    //}
    return obj;

}
export function getMembers(rooms:room[],room_id : string): user[]{
    var result : user[] = []
    for(var i =0; i < rooms.length; i++){
        if(getRoomId(rooms[i]) == room_id){
            result =  roomGetMembers(rooms[i]);
        }

    }
    return result;
    

}
export function addRoom(rooms:room[],name : string): void{
    rooms.push(new room(name))


}
export function addMember(rooms:room[] ,name : string, media_id: string, room_id: string): void{
    for(var i =0; i < rooms.length; i++){
        if(getRoomId(rooms[i]) == room_id){
            roomAddMember(rooms[i],new user(name, media_id))
        }

    }
    
}
export function removeMember(rooms:room[] ,name : string) : void{
    
    let array = getRooms(rooms)
    for(let i = 0; i < array.length;i++){
        if(isMemberJoinedRoom(array[i],name)){
            roomRemoveMember(array[i], name)
        }
    }

}
export function  isMemberJoinedRooms(rooms : room[] , memberId: string):boolean{
    let array:room[] = getRooms(rooms)
    for(let i = 0; i <array.length; i++){
        if(isMemberJoinedRoom(array[i],memberId)){
            return true
        }

    }
    return false
}