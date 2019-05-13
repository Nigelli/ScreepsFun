import { RoleName } from "enums/role-name";
const BASIC_HARVESTER = [WORK, MOVE, CARRY];
const BASIC_BUILDER = [WORK, MOVE, CARRY];

export class Spawner {
    public static createCreeps(spawn: StructureSpawn) {
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Harvester).length < spawn.room.memory.sources.length) {
            console.log('spawn new harvester')
            spawn.spawnCreep(BASIC_HARVESTER, `HAR-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Harvester } });
        }
        if (spawn.room.find(FIND_CONSTRUCTION_SITES).length && _.filter(Game.creeps, creep => creep.memory.role === RoleName.Builder).length < 1) {
            console.log('spawn new builder')
            spawn.spawnCreep(BASIC_BUILDER, `BLD-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Builder } });
        }
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Repairer).length < 1) {
            console.log('spawn new repairer')
            spawn.spawnCreep(BASIC_BUILDER, `RPR-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Repairer } });
        }
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Upgrader).length < spawn.room.memory.sources.length) {
            console.log('spawn new upgrader')
            spawn.spawnCreep(BASIC_BUILDER, `UPG-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Upgrader } });
        }
    }
}