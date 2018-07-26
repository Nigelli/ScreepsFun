var creepExtensions = require('creep');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRetainer = require('role.retainer');
var roleNurse = require('role.nurse');
var roleShunt = require('role.shunt');
var roleCollector = require('role.collector');
var roleExplorer = require('role.explorer');
var roleHarvesterBuilder = require('role.harvesterbuilder');
var roleReserver = require('role.reserver');
var Links = require('link'); 
var AutoSpawn = require('AutoSpawn');
var memoryResource = require('memory.resource');
var memoryUtilities = require('memory.utilities');
var Towers = require('towers');

module.exports.loop = function () {
    creepExtensions.extendObject();
    memoryUtilities.initialize();
    if ( Memory.AvailableSources.targets.length < 1) {
        console.log('no source targets, adding now');
        memoryResource.updateAvailableSources();
    }
    _.forEach(Links, link => link.run());
    
    Towers.run(Game.getObjectById('59d158c73471b468d7727c66'));
    Towers.run(Game.getObjectById('59d94bd974b6e363f5e517a8'));
    let baddies = Game.rooms['W58S17'].find(FIND_HOSTILE_CREEPS);
    if (baddies.length) {
        Towers.run(Game.getObjectById('59d3fca851e87566d14910d1'));
    }
    
    AutoSpawn.run();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        } else if(creep.memory.role == 'nurse') {
            roleNurse.run(creep);
        } else if(creep.memory.role == 'shunt') {
            roleShunt.run(creep);
        } else if(creep.memory.role == 'collector') {
            roleCollector.run(creep);
        } else if(creep.memory.role == 'explorer') {
            roleExplorer.run(creep);
        } else if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        } else if(creep.memory.role == 'retainer') {
            roleRetainer.run(creep);
        }
    }
}