Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1', {memory: {role: 'builder'}});

Object.keys(Game.creeps).map((key,index) => {if(Game.creeps[key].name.includes('Harvester')) {Game.creeps[key].memory.role = 'builder'}});

module.exports = {

};