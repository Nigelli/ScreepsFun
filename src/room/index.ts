export class RoomUtilities {
    private room: Room;
    constructor(room: Room) {
        this.room = room;

        if (!Object.keys(this.room.memory).length) {
            this.MapSources();
            if (Game.time % 60 === 0) {
                this.MapSourceContainers();
            }
        }
    }

    public MapSources() {
        this.room.memory.sources = this.room.find(FIND_SOURCES);
    }

    public MapSourceContainers() {
        const sourceContainers = this.room.find(FIND_MY_STRUCTURES)
            .filter((structure) => {
                return structure.structureType === StructureStorage.name ||
                    structure.structureType === StructureContainer.name
            }).filter(storage => {
                return this.room.find(FIND_SOURCES).some(source => source.pos.inRangeTo(storage.pos, 5));
            })

        this.room.memory.sourceContainerIds = sourceContainers.map(cntr => cntr.id);
    }
}