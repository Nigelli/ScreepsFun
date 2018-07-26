var Tower = {
    run: function(tower){
        if(tower) {
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                
                tower.attack(closestHostile);
            } else {
                var damagedStructures = _.filter(Memory.Rooms[tower.pos.roomName].Structures, structure => {
                    return (
                            (structure.hits < structure.hitsMax 
                            && structure.structureType != STRUCTURE_WALL 
                            && structure.structureType != STRUCTURE_RAMPART) 
                            || (structure.hits < 10000 
                            && structure.structureType == STRUCTURE_WALL) 
                            || (structure.hits < 100000 
                            && structure.structureType == STRUCTURE_RAMPART)
                        )
                })
                if(damagedStructures.length) {
                    tower.repair(Game.getObjectById(damagedStructures[0].id));
                }
            }
            
        }
    }
}



module.exports = Tower;