var config = require('config');

const roleExplorer = {
 
    run: function(creep){
        let target = creep.memory.target;
        if (!target) {
            let inactiveRooms = _.filter(config.SOURCE_TARGETS()['W58S17'], roomInfo => !Game.rooms[roomInfo.pos.roomName]);
            if (inactiveRooms.length) {
                creep.memory.target = inactiveRooms[0].pos;
            }
        } else {
            creep.moveTo(new RoomPosition(target.x -2, target.y, target.roomName));
        }
    }
    
}

module.exports = roleExplorer;