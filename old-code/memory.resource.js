var Config = require('config');

var memoryResource = {

    updateAvailableSources: function(){
        Memory['AvailableSources'].targets = Config.SOURCE_TARGETS();
    },
    
    setupAssingments: function(birthplace){
        let availableSources = Memory.AvailableSources;
        if (availableSources.targets[birthplace]) {
            availableSources.targets[birthplace].map(source => {
                source.assignedCount = 0
            });
            _.forEach(Game.creeps, creep => {
                if (creep.memory.role == 'harvester') {
                    let source = _.find(availableSources.targets[birthplace], source => { return creep.memory.target == source.id });
                    if (source) {
                        source.assignedCount = source.assignedCount + 1; 
                    }
                }
            })
        }
    },
    
    getSourceTarget: function(birthplace){
        if (!Memory['AvailableSources']) {
            console.log('updating sources');
            this.updateAvailableSources();
        }
        this.setupAssingments(birthplace)
        let sources = _.filter(Memory.AvailableSources.targets[birthplace], source => {
            return source.assignedCount < source.maxAssigned
            
        });
        if (sources.length) {
            return sources[0].id;
        }
        return Memory.AvailableSources.targets[birthplace][0].id;
        
    }
}

module.exports = memoryResource;