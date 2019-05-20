import { RoleName } from "enums/role-name";
import { RoomUtilities } from "room";
const BASIC_HARVESTER = [WORK, MOVE, CARRY];
const HARVESTER = [WORK, WORK, CARRY, MOVE];
const ADVANCED_HARVESTER = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
const BASIC_BUILDER = [WORK, MOVE, CARRY];
const BASIC_NURSE = [WORK, MOVE, CARRY];
const NURSE = [WORK, MOVE, MOVE, CARRY, CARRY];
const TRANSPORT = [WORK, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY];

export class Spawner {
    public static createCreeps(spawn: StructureSpawn) {
        switch (true) {
            case this.spawnNurse(spawn):
                break;
            case this.spawnRepairer(spawn):
                break;
            case this.spawnUpgrader(spawn):
                break;
            case this.spawnHarvester(spawn):
                break;
            case this.spawnBuilder(spawn):
                break;
            case this.spawnTransporter(spawn):
                break;
            default:
                break;
        }
    }

    private static spawnNurse(spawn: StructureSpawn) {
        if (spawn.room.memory.sourceContainerIds.length === spawn.room.memory.sources.length) {
            if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Nurse).length < 1) {
                console.log('spawn new nurse')
                spawn.spawnCreep(BASIC_NURSE, `NRS-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Nurse } });
                return true;
            }
        }
        return false;
    }

    private static spawnRepairer(spawn: StructureSpawn) {
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Repairer).length < 2) {
            console.log('spawn new repairer')
            spawn.spawnCreep(BASIC_BUILDER, `RPR-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Repairer } });
            return true;
        }
        return false;
    }

    private static spawnUpgrader(spawn: StructureSpawn) {
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Upgrader).length < 1) {
            console.log('spawn new upgrader')
            spawn.spawnCreep(BASIC_BUILDER, `UPG-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Upgrader } });
            return true;
        }
        return false;
    }

    private static spawnHarvester(spawn: StructureSpawn) {
        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Harvester).length < spawn.room.memory.sources.length) {
            console.log('spawn new harvester')

            const bodyType = this.UseAdvancedHarvester(spawn) ? ADVANCED_HARVESTER :
                this.HasCreep(spawn.room, RoleName.Nurse) && this.HasCreep(spawn.room, RoleName.Transporter) ? HARVESTER : BASIC_HARVESTER;
            spawn.spawnCreep(bodyType, `HAR-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Harvester } });
            return true;
        }
        return false;
    }

    private static UseAdvancedHarvester(spawn: StructureSpawn) {
        if (RoomUtilities.GetTotalEnergyCap(spawn.room) >= 700 && this.HasCreep(spawn.room, RoleName.Nurse)) {
            return true;
        }
        return false;
    }

    private static HasCreep(room: Room, creepType: RoleName) {
        return _.filter(Game.creeps, creep => creep.memory.role === creepType).length > 0;
    }

    private static spawnBuilder(spawn: StructureSpawn) {
        if (spawn.room.find(FIND_CONSTRUCTION_SITES).length && _.filter(Game.creeps, creep => creep.memory.role === RoleName.Builder).length < 1) {
            console.log('spawn new builder')
            spawn.spawnCreep(BASIC_BUILDER, `BLD-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Builder } });
            return true;
        }
        return false;
    }

    private static spawnTransporter(spawn: StructureSpawn) {
        if (RoomUtilities.GetTotalEnergyCap(spawn.room) < 700 || !this.HasCreep(spawn.room, RoleName.Nurse)) {
            return false;
        }

        if (!spawn.room.find(FIND_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_STORAGE).length) {
            return false
        }

        if (_.filter(Game.creeps, creep => creep.memory.role === RoleName.Transporter).length < 2) {
            console.log('spawn new transporter')
            spawn.spawnCreep(
                TRANSPORT,
                `TRS-${spawn.room.name}-${Game.time}`, { memory: { role: RoleName.Transporter } });
            return true;
        }
        return false;
    }
}