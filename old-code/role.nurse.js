var Utils = require('utility.path');
var StateUtility = require('utility.state');

var roleNurse = {
    
    collectEnergy: function(creep, target) {
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    
    distibuteEnergy: function(creep, target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },
    
    rest: function(creep, target) {
        creep.moveTo(target);
    },
    
    updateState: function(creep, targets) {
        if (this.helpers.amIEmpty(creep) && targets.length) {
            StateUtility.setMemoryState(creep, 'refuelling');
        } else if(!this.helpers.amIEmpty(creep) && targets.length) {
            StateUtility.setMemoryState(creep, 'distributing');
        } else if(!targets.length) {
            StateUtility.setMemoryState(creep, 'resting');
        }
        return StateUtility.getMemoryState(creep);
    },
    
    run: function(creep) {
        var emptyTargets = this.helpers.getEmptyTargets(creep);
        var state = this.updateState(creep, emptyTargets);
        switch (state) {
            case 'refuelling':
                this.collectEnergy(creep, this.helpers.getClosestNoneEmptyContainer(creep));
                break;
            case 'distributing':
                this.distibuteEnergy(creep, Utils.getClosestTarget(emptyTargets, creep));
                break;
            case 'resting':
                this.rest(creep, Game.spawns['Spawn1']);
                break;
            
        }
    },
    
    helpers: {
        getEmptyTargets: function(creep){
            var targets = _.filter(Memory.Structures, (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) 
                    && structure.energy < structure.energyCapacity);
            })
            if (targets.length) {
                return targets;
            }
            return [];
        },
        
        getClosestNoneEmptyContainer: function(creep){
            var targets = _.filter(Memory.Structures, (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) 
                    && structure.store[RESOURCE_ENERGY] > 50);
            })
            var target = Utils.getClosestTarget(targets, creep);
            return target;
        },
        
        amIEmpty: function(creep){
            return (creep.carry[RESOURCE_ENERGY] < 50);
        },
        
        // amIFull: function(creep){
        //     return (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity);
        // },
        
        setMemoryState: function(creep, state){
            creep.memory.state = state;
        },
        
        getMemoryState: function(creep){
            return creep.memory.state;
        }
    }
}

module.exports = roleNurse;