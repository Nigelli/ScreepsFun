var Utility = {
    getClosestTarget: function(targets, creep) {
        return creep.pos.findClosestByPath(targets);
    },
    isNearToResource: function(target, creep) {
        let array = _.filter(Game.rooms[creep.memory.birthplace].find(FIND_SOURCES), (source) => {
            return (source.pos.inRangeTo(target, 3));
        });
        if (array.length) {
            return true;
        }
        return false;
    },
    isNearToController: function(target, creep) {
        let array = _.filter(Game.rooms[creep.memory.birthplace].find(FIND_STRUCTURES), (structure) => {
               return (structure.structureType == STRUCTURE_CONTROLLER && structure.pos.isNearTo(target));
            }); 
        if (array.length) {
            return true;
        }
        return false;
    }
    
}

module.exports = Utility;