import { Spawns } from "enums/spawn";
import { RoleName } from "enums/role-name";
const BASIC_HARVESTER = [WORK, MOVE, CARRY];
const BASIC_BUILDER = [WORK, MOVE, CARRY];

export class Spawner {
    public static createCreeps(spawn: StructureSpawn) {
        if (_.filter(Game.creeps, creep => creep.memory.role === 'Harvester' || creep.memory.role === RoleName.Harvester).length < 4) {
            console.log('spawn new harvester')
            spawn.spawnCreep(BASIC_HARVESTER, `HAR-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Harvester } });
        }
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Builder).length < 1) {
            console.log('spawn new builder')
            spawn.spawnCreep(BASIC_BUILDER, `BLD-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Builder } });
        }
    }
}