var Utils = require('utility.path');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 collect');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var targets = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER) 
                    && structure.store[RESOURCE_ENERGY] > 50);
            })
            if (targets.length) {
                if(creep.withdraw(Utils.getClosestTarget(targets, creep), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Utils.getClosestTarget(targets, creep), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleUpgrader;