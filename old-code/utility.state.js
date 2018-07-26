var Utility = {
    setMemoryState: function(creep, state){
        creep.memory.state = state;
    },
    
    getMemoryState: function(creep){
        return creep.memory.state;
    },
    
    getMemoryTarget: function(creep){
        return creep.memory.target;
    },
    
    setMemoryTarget: function(creep, targetId){
        creep.memory.target = targetId;
    },
    
    clearMemoryTarget: function(creep) {
        creep.memory.target = null;
    }
}

module.exports = Utility;