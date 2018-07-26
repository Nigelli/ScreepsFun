export class MemoryManagement {
    public static clearDeadCreeps(): void {
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                console.log(`Removing Creep :: ${name} from memory`)
                delete Memory.creeps[name];
            }
        }
    }

    public static initialise(): void {
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
    }

    public static Rooms = {
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

    public static Structures = {
        setCurrent: function() {
            var structures: AnyStructure[] = []; 
            _.forEach(Game.rooms, (room) => {
                let roomStructures = room.find(FIND_STRUCTURES)
                structures = structures.concat(roomStructures);
                if (MemoryManagement.Rooms.getLastRefreshTime() < Game.time - 10 || !MemoryManagement.Rooms.getLastRefreshTime()) {
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
            var sites: ConstructionSite[] = []; 
            _.forEach(Game.rooms, (room) => {
                sites = sites.concat(room.find(FIND_CONSTRUCTION_SITES));
            })
            Memory.ConstructionSites = sites; 
        }
    }
}