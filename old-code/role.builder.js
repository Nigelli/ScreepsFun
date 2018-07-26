var Utils = require('utility.path');
var Config = require('config');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (typeof creep.memory.building === "undefined") {
            creep.memory.building = false;
        }
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 collect');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            if (creep.memory.target) {
                let target = Game.getObjectById(creep.memory.target.id);
                if (target && typeof target.hits == 'undefined') {
                    creep.moveAndBuild(target);
                } else {
                    if (!creep.setConstructionTarget()) {
                        let towers = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, structure => structure.structureType == STRUCTURE_TOWER && structure.energy != structure.energyCapacity);
                        if (towers.length) {
                            creep.moveAndTransfer(towers[0]);   
                        }
                    } else {
                        creep.moveAndBuild(Game.getObjectById(creep.memory.target.id));
                    }
                }
            } else {
                if (!creep.setConstructionTarget()) {
                        let towers = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, structure => structure.structureType == STRUCTURE_TOWER && structure.energy != structure.energyCapacity);
                        if (towers.length) {
                            creep.moveAndTransfer(towers[0]);   
                        }
                    } else {
                        creep.moveAndBuild(Game.getObjectById(creep.memory.target.id));
                    }
            }
        }
        else {
            let targets = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, structure => structure.structureType == STRUCTURE_STORAGE);
            if (!targets.length) {
                targets = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, structure => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= 50;
                    
                });
            }
            target = Utils.getClosestTarget(targets, creep);
            if (target) {
                creep.moveAndWithdraw(target);
            } else {
                creep.moveAndWithdraw(targets[0]);
            }
        }
    }
};

module.exports = roleBuilder;