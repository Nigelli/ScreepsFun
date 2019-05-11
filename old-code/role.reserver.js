var config = require('config');

const roleReserver = {
 
    run: function(creep){
        if (!creep.pos.isNearTo(new RoomPosition(14, 36, 'W59S17'))) {
            creep.moveTo(new RoomPosition(14, 36, 'W59S17'));
        } else {
            target = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_CONTROLLER }});
            creep.reserveController(target[0]);
        }
    }
    
}

module.exports = roleReserver;