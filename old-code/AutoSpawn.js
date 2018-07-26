var memoryResource = require('memory.resource');
var Config = require('config');

var AutoSpawn = {
    
    run: function(){
        this.cleanMemory();
        
        for(let creepConfig of Config.populationConfig) {
            this.autoSpawner(creepConfig);
        }
        // this.nurse();
        // this.harvester();
        // this.upgrader();
        // this.shunt();
        // this.collector();
        // this.repairer();
        // this.builder();
        // this.explorer();
    },
    
    cleanMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    
    autoSpawner: function(creepConfig){
        var existingCreeps = _.filter(Game.creeps, (creep) => {
            return (creep.memory.role == creepConfig.role && creep.memory.birthplace == creepConfig.birthplace)
        });
        if (
            (existingCreeps.length < creepConfig.population && Game.spawns[creepConfig.spawn].energyCapacity == Game.spawns[creepConfig.spawn].energy)
            ||(creepConfig.role == 'nurse' && existingCreeps.length < creepConfig.population)
            ||(creepConfig.role == 'harvester' && existingCreeps.length < creepConfig.population)
            ) {
            var newName = creepConfig.name + '_' + Game.time + '_' + creepConfig.birthplace;
            console.log('Spawning new ' + creepConfig.role + ': ' + newName + ', from: ' + creepConfig.spawn);
            Game.spawns[creepConfig.spawn].spawnCreep(Config.getCreepBodyConfig(creepConfig.role, creepConfig.birthplace), newName,
                { memory: this.getMemoryObject(creepConfig)});
        }
    },
    
    getMemoryObject: function(config){
        if (config.role == 'harvester') {
            return { role: config.role, target: memoryResource.getSourceTarget(config.birthplace), birthplace: config.birthplace  };
        } else {
            return { role: config.role, birthplace: config.birthplace  };
        }
    },
    
    harvester: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (harvesters.length < Config._MaxHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(Config.getCreepBodyConfig('harvester'), newName,
                {memory: {role: 'harvester', target: memoryResource.getSourceTarget(creepConfig.birthplace), birthplace: creepConfig.birthplace  }});
        }
    },
    
    // builder: function() {
    //     var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //     if (builders.length < Config._MaxBuilders && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy) {
    //         var newName = 'Builder' + Game.time;
    //         console.log('Spawning new builder: ' + newName);
    //         Game.spawns['Spawn1'].spawnCreep(Config.getCreepConfig('builder'), newName,
    //             {memory: {role: 'builder', birthplace: creepConfig.birthplace }});
    //     }
    // },
    
    // repairer: function() {
    //     var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    //     if (repairers.length < Config._MaxRepairers && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy) {
    //         var newName = 'Repairer' + Game.time;
    //         console.log('Spawning new Repairer: ' + newName);
    //         Game.spawns['Spawn1'].spawnCreep(Config.getCreepConfig('repairer'), newName,
    //             {memory: {role: 'repairer', birthplace: creepConfig.birthplace }});
    //     }
    // },
    
    // upgrader: function() {
    //     var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //     if (upgraders.length < Config._MaxUpgraders && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy) {
    //         var newName = 'Upgrader' + Game.time;
    //         console.log('Spawning new upgrader: ' + newName);
    //         Game.spawns['Spawn1'].spawnCreep(Config.getCreepConfig('upgrader'), newName,
    //             {memory: {role: 'upgrader', birthplace: creepConfig.birthplace }});
    //     }
    // },
    
    nurse: function() {
        var nurses = _.filter(Game.creeps, (creep) => creep.memory.role == 'nurse');
        if (nurses.length < Config._MaxNurses) {
            var newName = 'Nurse' + Game.time;
            console.log('Spawning new nurse: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(Config.getCreepBodyConfig('nurse'), newName,
                {memory: {role: 'nurse', birthplace: creepConfig.birthplace }});
        }
    },
    
    // shunt: function() {
    //     var shunters = _.filter(Game.creeps, (creep) => creep.memory.role == 'shunt');
    //     if (shunters.length < Config._MaxShunts && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy) {
    //         var newName = 'Shunt' + Game.time;
    //         console.log('Spawning new shunt: ' + newName);
    //         Game.spawns['Spawn1'].spawnCreep(Config.getCreepConfig('shunt'), newName,
    //             {memory: {role: 'shunt', birthplace: creepConfig.birthplace }});
    //     }
    // },
    
    // collector: function() {
    //     var collectors = _.filter(Game.creeps, (creep) => creep.memory.role == 'collector');
    //     if (collectors.length < Config._MaxCollectors && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy) {
    //         var newName = 'Collector' + Game.time;
    //         console.log('Spawning new collector: ' + newName);
    //         Game.spawns['Spawn1'].spawnCreep(Config.getCreepConfig('collector'), newName,
    //             {memory: {role: 'collector', birthplace: creepConfig.birthplace }});
    //     }
    // },
    
    // explorer: function() {
    //     var explorers = _.filter(Game.creeps, (creep) => creep.memory.role == 'explorer');
    //     if (explorers.length < Config._MaxExplorers && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy) {
    //         var newName = 'Explorer' + Game.time;
    //         console.log('Spawning new explorer: ' + newName);
    //         Game.spawns['Spawn1'].spawnCreep(Config.getCreepConfig('explorer'), newName,
    //             {memory: {role: 'explorer', birthplace: creepConfig.birthplace }});
    //     }
    // }
    
}

module.exports = AutoSpawn;