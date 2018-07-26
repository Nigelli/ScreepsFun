const creepExtensions = {
    extendObject: function() {
        Creep.prototype.moveAndTransfer = function(target, resource) {
            if (target) {
                if(this.transfer(Game.getObjectById(target.id), resource || RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(target.id), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
        Creep.prototype.moveAndWithdraw = function(target, resource) {
            if (target) {
                if(this.withdraw(Game.getObjectById(target.id), resource || RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(target.id), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        
        Creep.prototype.moveAndBuild = function(target) {
            if (target) {
                if(this.build(Game.getObjectById(target.id)) == ERR_NOT_IN_RANGE) {
                    this.moveTo(Game.getObjectById(target.id), {visualizePathStyle: {stroke: '#d7f442', opacity: .25, lineStyle:'dotted'}});
                }
            }
        }
        
        Creep.prototype.setConstructionTarget = function() {
            let targets = Memory.ConstructionSites;
            if (targets.length) {
                this.memory.target = targets[0];
            } else {
                return false;
            }
        }
        
        Creep.prototype.log = function() {
            console.log(JSON.stringify(this));
        }
    }
}

module.exports = creepExtensions;