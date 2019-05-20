export class RoomUtilities {

    public static Loop(room: Room) {
        if (!Object.keys(room.memory).length) {
            this.MapSources(room);
        }

        if (Game.time % 60 === 0) {
            this.MapSourceContainers(room);
            this.SetTotalEnergyCap(room);
        }
    }

    public static GetDamagedStructures(room: Room) {
        return room.find(FIND_STRUCTURES)
            .filter(structure => structure.structureType !== STRUCTURE_WALL)
            .filter(structure => structure.hits < structure.hitsMax);
    }

    public static GetDamagedDefenses(room: Room) {
        return room.find(FIND_STRUCTURES)
            .filter(structure => structure.structureType === STRUCTURE_WALL)
            .filter(structure => structure.hits < 30000);
    }

    public static MapSources(room: Room) {
        room.memory.sources = room.find(FIND_SOURCES);
    }

    public static MapSourceContainers(room: Room) {
        const sourceContainers = room.find(FIND_STRUCTURES)
            .filter((structure) => {
                return structure.structureType === STRUCTURE_STORAGE ||
                    structure.structureType === STRUCTURE_CONTAINER
            }).filter(storage => {
                return room.find(FIND_SOURCES).some(source => source.pos.inRangeTo(storage.pos, 5));
            })

        room.memory.sourceContainerIds = sourceContainers.map(cntr => cntr.id);
    }

    public static GetTotalEnergyCap(room: Room) {
        if (!room.memory.totalEnergyCap) {
            return this.SetTotalEnergyCap(room);
        }
        return room.memory.totalEnergyCap;
    }

    private static SetTotalEnergyCap(room: Room): number {
        let targets: Array<StructureSpawn | StructureExtension> = room.find(FIND_MY_SPAWNS);
        targets = targets.concat(room.find<StructureSpawn | StructureExtension>(FIND_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_EXTENSION));
        room.memory.totalEnergyCap = _.sum(targets.map(t => t.energyCapacity));
        return room.memory.totalEnergyCap;
    }
}