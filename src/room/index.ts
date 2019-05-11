export class RoomUtilities {
    private room: Room;
    constructor(room: Room) {
        this.room = room;

        if (!Object.keys(this.room.memory).length) {
            this.MapSources();
        }
    }

    public MapSources() {
        this.room.memory.sources = this.room.find(FIND_SOURCES);
    }
}