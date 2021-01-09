export class user {
    name : string;
    media_id : string;
    constructor(name : string, media_id : string){
        this.name = name;
        this.media_id = media_id;

    }


}
export class room_class{
    room_id : string;
    members : user[] = [];
    constructor(name : string){
        this.room_id = name

    }

}
export function get_room_id(obj:room_class): string{
    return obj.room_id;

}
export function room_get_members(obj:room_class): user[]{
    return obj.members;

}
export function room_add_member(obj:room_class,member : user): void{
    obj.members.push(member)

}
export function room_remove_member(obj:room_class,member : string){
    for(var x = 0; x < obj.members.length; x++){
        if(member==obj.members[x].name){ 
            
            obj.members.splice(x,1)   
        }
    }
}
export function  is_member_joined_room(obj : room_class, member_id: string):boolean{
    let array:user[] = room_get_members(obj)
    for(let i = 0; i< array.length;i++){
        if(array[i].name == member_id){
            return true;
        }
    }
    return false; 

}
export class rooms_class {

    rooms : room_class[] = [];

}
export function get_rooms(obj:rooms_class): room_class[]{
    //var rooms_list : string[] = [];
    //for(var i = 0; i < obj.rooms.length; i++){
        //rooms_list.push(obj.rooms[i].get_room_id());
        //rooms_list.push(get_room_id(obj.rooms[i]))

    //}
    return obj.rooms;

}
export function get_members(obj:rooms_class,room_id : string): user[]{
    var result : user[] = []
    for(var i =0; i < obj.rooms.length; i++){
        if(get_room_id(obj.rooms[i]) == room_id){
            result =  room_get_members(obj.rooms[i]);
        }

    }
    return result;
    

}
export function add_room(obj:rooms_class,name : string): void{
    obj.rooms.push(new room_class(name))


}
export function add_member(obj:rooms_class,name : string, media_id: string, room_id: string): void{
    for(var i =0; i < obj.rooms.length; i++){
        if(get_room_id(obj.rooms[i]) == room_id){
            room_add_member(obj.rooms[i],new user(name, media_id))
        }

    }
    
}
export function remove_member(obj:rooms_class,name : string) : void{
    
    let array = get_rooms(obj)
    for(let i = 0; i < array.length;i++){
        if(is_member_joined_room(array[i],name)){
            room_remove_member(array[i], name)
        }
    }

}
export function  is_member_joined_rooms(obj : rooms_class, member_id: string):boolean{
    let array:room_class[] = get_rooms(obj)
    for(let i = 0; i <array.length; i++){
        if(is_member_joined_room(array[i],member_id)){
            return true
        }

    }
    return false
}
export function copy_rooms(objp:rooms_class, objc:rooms_class):void{

    objp.rooms = objc.rooms.slice()

}