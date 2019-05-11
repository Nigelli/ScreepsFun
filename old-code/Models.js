const Models = {
    
    Target: function(identifier, x, y, roomName){
        if (!id || !x || !y || !roomName) {
            return null;
        }
        var target = {
            pos: new RoomPosition(x, y, roomName), 
            id: identifier
        }
        
        return target;
    }
    
    
    
}


module.exports = Models;