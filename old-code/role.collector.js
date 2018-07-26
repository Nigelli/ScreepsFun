var Config = require('config');
var StateUtility = require('utility.state');
var PathUtility = require('utility.path');

var roleCollector = {
    
    run: function(creep) {
        var state = this.updateState(creep);
        switch (state) {
            case 'collecting':
                this.collect(creep);
                break;
            case 'delivering':
                this.deliver(creep);
                break;
        }
    },
    
    collect: function(creep) {
        let target = Game.getObjectById(creep.memory.target);
        if (target) {
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_ENERGY){
                StateUtility.setMemoryTarget(creep, this.helpers.getFullestSourceContainerId(creep));
            }
        }
    },
    
    deliver: function(creep) {
        let target = Game.getObjectById(creep.memory.target);
        if (target.store[RESOURCE_ENERGY] > 200000) {
            
            var towers = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, (structure) => structure.structureType == STRUCTURE_TOWER && Game.getObjectById(structure.id).energy < Game.getObjectById(structure.id).energyCapacity);
            if (towers.length) {
                target = towers[0];
            }
        }
        creep.moveAndTransfer(target);
        // if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        // }
    },
    
    updateState: function(creep){
        var state = StateUtility.getMemoryState(creep);
        var targetId = StateUtility.getMemoryTarget(creep);
        if (state == 'collecting' && targetId.length && this.helpers.amIFull(creep)) {
            StateUtility.setMemoryTarget(creep, this.helpers.getLeastFullTargetContainerId(creep));
            StateUtility.setMemoryState(creep, 'delivering');
            
        } else if (!state || !targetId || (state == 'delivering' && targetId.length && this.helpers.amIEmpty(creep))) {
            StateUtility.setMemoryTarget(creep, this.helpers.getFullestSourceContainerId(creep));
            StateUtility.setMemoryState(creep, 'collecting');
            
        }
        return StateUtility.getMemoryState(creep);
    },
    
    helpers: {
        
        getSourceContainers: function(creep){
            var containers = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, (structure) => {
                   return (structure.structureType == STRUCTURE_CONTAINER);
                }); 
            var sourceContainers = _.filter(containers, container => PathUtility.isNearToResource(container, creep));
            return sourceContainers;
            
        },
        
        getTargetContainers: function(creep){
            var containers = _.filter(Memory.Rooms[creep.memory.birthplace].Structures, (structure) => {
               return (structure.structureType == STRUCTURE_STORAGE)
            }); 
            var targetContainers = _.filter(containers, container => PathUtility.isNearToController(container, creep));
            return containers;
        },
        
        getFullestSourceContainerId: function(creep){
            let sources = roleCollector.helpers.getSourceContainers(creep);
            if (sources.length) {
                let mostFullContainer = sources.reduce((prev, current) => {
                    return (prev.store[RESOURCE_ENERGY] > current.store[RESOURCE_ENERGY]) ? prev : current
                })
                let link = Game.getObjectById('59d4271e3957200907fedc9a');
                if (link.energy > mostFullContainer.store[RESOURCE_ENERGY]) {
                    return '59d4271e3957200907fedc9a';
                }
                return mostFullContainer.id;
            }
            
        },
        
        getLeastFullTargetContainerId: function(creep){
            let sources = roleCollector.helpers.getTargetContainers(creep);
            if (sources.length) {
                let leastFullContainer = sources.reduce((prev, current) => {
                    return(prev.store[RESOURCE_ENERGY] < current.store[RESOURCE_ENERGY]) ? prev : current
                })
                return leastFullContainer.id;
            } else {
                return '59d29658f5b45b45728f5dc5';
            }
        },
        
        amIEmpty: function(creep){
            return (creep.carry[RESOURCE_ENERGY] < 50);
        },
        
        amIFull: function(creep){
            return (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity);
        }
    }
    
}

module.exports = roleCollector;