const MemoryUtilities = {
    
    initialize: function(){
        if (!Memory.Rooms) {
            Memory.Rooms = {};
        }
        if (!Memory.Rooms.Active) {
            Memory.Rooms.Active = [];
        }
        if (!Memory.AvailableSources) {
            Memory.AvailableSources = {};
        }
        if (this.Rooms.getLastRefreshTime() < Game.time - 20 || !this.Rooms.getLastRefreshTime()) {
            this.Rooms.setInfo();
            this.Rooms.setLastRefreshTime();
        }
        this.Structures.setCurrent();
        this.Structures.setConstructionSites();
    },
    
    Structures: {
        
        setCurrent: function() {
            var structures = []; 
            _.forEach(Game.rooms, (room) => {
                let roomStructures = room.find(FIND_STRUCTURES)
                structures = structures.concat(roomStructures);
                if (MemoryUtilities.Rooms.getLastRefreshTime() < Game.time - 10 || !MemoryUtilities.Rooms.getLastRefreshTime()) {
                    if (!Memory.Rooms[room.name]) {
                        Memory.Rooms[room.name] = { Structures: roomStructures };
                    } else {
                        Memory.Rooms[room.name].Structures = roomStructures;
                    }
                }
            })
            Memory.Structures = structures; 
        }, 
        
        setConstructionSites: function() {
            var structures = []; 
            _.forEach(Game.rooms, (room) => {
                structures = structures.concat(room.find(FIND_CONSTRUCTION_SITES));
            })
            Memory.ConstructionSites = structures; 
        }, 
    },
    
    Rooms: {
        
        setLastRefreshTime: function() {
            Memory.Rooms.LastRefreshTime = Game.time;
            console.log('Room refresh time: ', Memory.Rooms.LastRefreshTime);
        },
        
        getLastRefreshTime: function() {
            return Memory.Rooms.LastRefreshTime;
        },
        
        setInfo: function() {
            let activeRooms = _.filter(Game.rooms, room => room);
            activeRooms.map(room => {
                let newRooms = _.difference([room.name], Memory.Rooms.Active);
                if (newRooms.length) {
                    Memory.Rooms.Active.push(newRooms[0]);
                }
            })
        },
        
        getInfo: function() {
            return Memory.Rooms.Active;
        },
        
        setEmergencyRepairTarget: function() {
            if (!Memory.Rooms.EmergencyRepairs) {
                Memory.Rooms.EmergencyRepairs = [];
            }
            
        },
        
        setConstructionSitesByRoom: function() {
            
        }
    }
    
    
}

module.exports = MemoryUtilities;