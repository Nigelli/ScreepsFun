var Utils = require('utility.path');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.reparing && creep.carry.energy == 0) {
            creep.memory.reparing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.reparing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.reparing = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.reparing) {
            
            var targets = _.filter(Memory.Structures, (structure) => {
                    return (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART  && structure.hits < structure.hitsMax)
                }
            )
            if (!targets.length) {
                targets = _.filter(Memory.Structures, (structure) => {
                        return (structure.structureType == STRUCTURE_WALL && structure.hits < 10000 || 
                        structure.structureType == STRUCTURE_RAMPART && structure.hits < 10000 );
                });
            }
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
               creep.moveTo(new RoomPosition(48,13,'W59S17'));
            }
        } else {
            var targets = _.filter(Game.rooms['W58S17'].find(FIND_STRUCTURES), (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER) 
                    && structure.store[RESOURCE_ENERGY] > 50);
            })
            if (targets.length) {
                let target = Utils.getClosestTarget(targets, creep);
                if (target) {
                    roleRepairer.withdrawOrMove(creep, target);
                } else {
                    roleRepairer.withdrawOrMove(creep, targets[0]);
                }
            }
        }
    },
    
    withdrawOrMove: function(creep, target){
        
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleRepairer;