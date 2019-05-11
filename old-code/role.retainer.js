var Utils = require('utility.path');

var roleRetainer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0 || creep.memory.upgrading == 'undefined') {
            creep.memory.upgrading = false;
            creep.say('🔄 collect');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(Game.rooms['W57S17'].controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms['W57S17'].controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var targets = _.filter(Memory.Structures, (structure) => {
                return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) 
                    && structure.store[RESOURCE_ENERGY] > 50);
            })
            if (targets.length) {
                let target = Utils.getClosestTarget(targets, creep);
                if (target) {
                    roleRetainer.withdrawOrMove(creep, target);
                } else {
                    roleRetainer.withdrawOrMove(creep, Game.getObjectById('59d29658f5b45b45728f5dc5'));
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

module.exports = roleRetainer;