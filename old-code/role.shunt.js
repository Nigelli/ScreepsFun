var Config = require('config');
var StateUtility = require('utility.state');
var PathUtility = require('utility.path');

var roleShunt = {
    
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
         var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
             filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
         if (dropenergy) {
             if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(dropenergy)
             }
        } else {
            let target = Game.getObjectById(creep.memory.target);
            if (target) {
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }
    },
    
    deliver: function(creep) {
        let target = Game.getObjectById(creep.memory.target);
        if (target.store[RESOURCE_ENERGY] > (target.storeCapacity -400)) {
            var towers = _.filter(Memory.Structures, (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity - 200 );
            if (towers.length) {
                target = towers[0];
            } else {
                let storageCon = _.filter(Memory.Structures, (structure) => structure.structureType == STRUCTURE_STORAGE);
                if (storageCon.length) {
                    target = storageCon[0];
                }
            }
        }
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
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
            var containers = _.filter(Memory.Structures, (structure) => {
               return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
            }); 
            var sourceContainers = _.filter(containers, container => (PathUtility.isNearToResource(container, creep) || container.structureType == STRUCTURE_STORAGE));
            return sourceContainers;
            
        },
        
        getTargetContainers: function(creep){
            var containers = _.filter(Memory.Structures, (structure) => {
               return (structure.structureType == STRUCTURE_CONTAINER)
            }); 
            var targetContainers = _.filter(containers, container => PathUtility.isNearToController(container, creep));
            return targetContainers;
        },
        
        getFullestSourceContainerId: function(creep){
            let sources = roleShunt.helpers.getSourceContainers(creep);
            let mostFullContainer = sources.reduce((prev, current) => {
                return (prev.store[RESOURCE_ENERGY] > current.store[RESOURCE_ENERGY]) ? prev : current
            })
            return mostFullContainer.id;
            
        },
        
        getLeastFullTargetContainerId: function(creep){
            let sources = roleShunt.helpers.getTargetContainers(creep);
            let leastFullContainer = sources.reduce((prev, current) => {
                return(prev.store[RESOURCE_ENERGY] < current.store[RESOURCE_ENERGY]) ? prev : current
            })
            return leastFullContainer.id;
        },
        
        amIEmpty: function(creep){
            return (creep.carry[RESOURCE_ENERGY] < 50);
        },
        
        amIFull: function(creep){
            return (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity);
        }
    }
    
}

module.exports = roleShunt;