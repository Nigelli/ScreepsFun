const config = {
    _MaxHarvesters: 4,
    _MaxUpgraders: 1,
    _MaxBuilders: 1,
    _MaxRepairers: 1,
    _MaxNurses: 2,
    _MaxShunts: 2,
    _MaxCollectors: 1,
    _MaxExplorers: 1,
    
    populationConfig: [
        
        // Room 1
        { role: 'nurse', name: 'Nurse', population: 2, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'harvester', name: 'Harvester', population: 5, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'upgrader', name: 'Upgrader', population: 2, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'builder', name: 'Builder', population: 2, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'repairer', name: 'Repairer', population: 1, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'shunt', name: 'Shunt', population: 2, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'collector', name: 'Collector', population: 1, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'explorer', name: 'Explorer', population: 1, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'reserver', name: 'Reserver', population: 1, spawn: 'Spawn1', birthplace: 'W58S17' },
        { role: 'retainer', name: 'Retainer', population: 1, spawn: 'Spawn1', birthplace: 'W58S17' },
        
        // Room 2
        { role: 'nurse', name: 'Nurse', population: 2, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'harvester', name: 'Harvester', population: 4, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'upgrader', name: 'Upgrader', population: 2, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'builder', name: 'Builder', population: 2, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'repairer', name: 'Repairer', population: 1, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'shunt', name: 'Shunt', population: 0, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'collector', name: 'Collector', population: 1, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'explorer', name: 'Explorer', population: 0, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'reserver', name: 'Reserver', population: 0, spawn: 'Spawn2', birthplace: 'W57S17' },
        { role: 'retainer', name: 'Retainer', population: 0, spawn: 'Spawn2', birthplace: 'W57S17' },
    ],
    
    CREEP_LEVELS: {
        1: {
            harvester: [WORK,WORK,CARRY,MOVE],
            upgrader: [WORK,WORK,CARRY,MOVE],
            repairer: [WORK,WORK,CARRY,MOVE],
            builder: [WORK,WORK,CARRY,MOVE],
            nurse: [CARRY,CARRY,MOVE,MOVE],
            shunt: [CARRY,CARRY,MOVE,MOVE],
            collector: [CARRY,CARRY,MOVE,MOVE],
            explorer: [MOVE]
        },
        2: {
            harvester: [WORK,WORK,WORK,CARRY,MOVE],
            upgrader: [WORK,WORK,WORK,WORK,CARRY,MOVE],
            repairer: [WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            builder: [WORK,WORK,CARRY,MOVE,MOVE,MOVE],
            nurse: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
            shunt: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            collector: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            explorer: [MOVE]
        },
        4: {
            harvester: [WORK,WORK,WORK,WORK,CARRY,MOVE],
            upgrader: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
            repairer: [WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            builder: [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            nurse: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
            shunt: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            collector: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            explorer: [MOVE],
            reserver: [MOVE,MOVE,CLAIM]
        },
        3: {
            harvester: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
            upgrader: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            repairer: [WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            builder: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            nurse: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
            shunt: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            collector: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            explorer: [MOVE],
            reserver: [MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM],
            retainer: [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]
        },
        5: {
            harvester: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
            upgrader: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            repairer: [WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            builder: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            nurse: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
            shunt: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            collector: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
            explorer: [MOVE],
            reserver: [MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM],
            retainer: [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]
        }
    },
    
    ROOMS: {
        base: 'W58S17',
        range1: ['W59S17']
    },
    
    SOURCE_TARGETS: function() {
        return {
            W58S17:[ 
                { pos: new RoomPosition(8, 27, 'W58S17'), id: '59bbc3ad2052a716c3ce68a6', assignedCount: 0, maxAssigned: 2 }, //Room1
                { pos: new RoomPosition(17, 21, 'W58S17'), id: '59bbc3ad2052a716c3ce68a5', assignedCount: 0, maxAssigned: 2 }, //Room1
                { pos: new RoomPosition(46, 13, 'W59S17'), id: '59bbc39f2052a716c3ce6717', assignedCount: 0, maxAssigned: 2 }, // Room2
                { pos: new RoomPosition(41, 18, 'W58S18'), id: '59bbc3ad2052a716c3ce68a9', assignedCount: 0, maxAssigned: 0 } // Room3
                ],
            W57S17:[
                { pos: new RoomPosition(35, 18, 'W57S17'), id: '59bbc3bc2052a716c3ce6a38', assignedCount: 0, maxAssigned: 2 }, //Room1
                { pos: new RoomPosition(12, 29, 'W57S17'), id: '59bbc3bc2052a716c3ce6a3a', assignedCount: 0, maxAssigned: 2 }, //Room1
                ]
            
        };
    },
    
    getCreepBodyConfig: function(type, roomName) {
        var roomLevel = Game.rooms[roomName].controller.level;
        if (!this.CREEP_LEVELS[roomLevel]) {
            roomLevel = roomLevel - 1;
        }
        return this.CREEP_LEVELS[roomLevel][type];
    }
}

module.exports = config;