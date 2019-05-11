import { ROLES } from "config/roles/Constants";
import { RoleConfigFactory } from "config/roles/RoleConfig";

export class Spawner {
    
    public static spawnCreep(role: string, spawnerName: string): void {
        let currentRoom = Game.spawns[spawnerName].room;
        Game.spawns[spawnerName].spawnCreep(
            this.getBodyOptions(role, currentRoom.name),
            this.getName(role, currentRoom.name),
            this.getSpawnOptions(role));
    }

    private static getBodyOptions(role: string, roomName: string): BodyPartConstant[] {
        return RoleConfigFactory.get(role).bodyParts(roomName);
    }

    private static getName(role: string, roomName: string): string {
        return `${role}::${Game.time}::${roomName}`;
    }

    private static getSpawnOptions(role: string): SpawnOptions {
        let options: SpawnOptions = {};

        options.memory = this.getInitialMemory();
        options.directions = this.getInitalDirections();
        // options.dryRun;
        // options.energyStructures;

        return options;
    }

    private static getInitalDirections(): DirectionConstant[] {
        return [];
    }

    private static getInitialMemory(): CreepMemory {
        return {};
    }
}