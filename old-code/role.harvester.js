var Utils = require('utility.path');
var memoryResource = require('memory.resource');

var harvesterRole = {
 /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if (!creep.memory.birthplace) {
                creep.memory.birthplace = 'W58S17'
            }
            if (!creep.memory.target) {
                creep.memory.target = memoryResource.getSourceTarget(creep.memory.birthplace);
            }
            let target = _.find(Memory.AvailableSources.targets[creep.memory.birthplace], target => target.id == creep.memory.target);
            if (!creep.pos.isNearTo(target.pos.x, target.pos.y)) {
                creep.moveTo(new RoomPosition(target.pos.x, target.pos.y, target.pos.roomName), {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                let source = creep.pos.findInRange(FIND_SOURCES, 1);
                if(source.length) {
                    if(creep.harvest(source[0]) == ERR_NOT_ENOUGH_ENERGY){
                        creep.memory.target = memoryResource.getSourceTarget(creep.memory.birthplace);
                    };
                }
            }
            
            // let target = Game.getObjectById(creep.memory.target);
            // if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
        }
        else {
            var target = this.getClosestNoneEmptyContainer(creep);
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
               creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    },
    getClosestNoneEmptyContainer: function(creep){
        var storeTargets = _.filter(Memory.Structures, (structure) => {
               return (((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
               && structure.store[RESOURCE_ENERGY] < structure.storeCapacity) 
               || structure == Game.getObjectById('59d4e06488676c7391f502c6') && structure.energy < structure.energyCapacity)
            }); 
        if (storeTargets.length) {
            return Utils.getClosestTarget(storeTargets, creep);
        }
        return false;
    }
}

module.exports = harvesterRole;