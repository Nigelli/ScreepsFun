import { Spawns } from "enums/spawn";
const BASIC_HARVESTER = [WORK, MOVE, CARRY];

export class Spawner {
    public static createHarvester(spawn: StructureSpawn) {
        if (_.filter(Memory.creeps, (creep) => { creep.role === 'Harvester' }).length < 4) {
            console.log('spawn new harvester')
            spawn.spawnCreep(BASIC_HARVESTER, `HAR-${spawn.room.name}-${Game.time}`, { memory: { role: 'Harvester' } });
        }
    }
}