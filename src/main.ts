import { ErrorMapper } from "utils/ErrorMapper";
import { RoomUtilities } from "room";
import { Harvester } from "roles/harvester";
import { Spawns } from "enums/spawn";
import { Spawner } from "spawning/spawner";
import { RoleName } from "enums/role-name";
import { Builder } from "roles/builder";
import { Repairer } from "roles/repairer";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  Spawner.createCreeps(Game.spawns[Spawns.Spawn1]);

  _.forEach(Game.rooms, (room) => {
    new RoomUtilities(room);
  })

  _.forEach(Game.creeps, (creep) => {
    switch (creep.memory.role) {
      case RoleName.Builder:
        new Builder(creep).DoWork();
        break;
      case RoleName.Harvester:
        new Harvester(creep).DoWork();
        break;
      case 'Harvester':
        new Harvester(creep).DoWork();
        break;
      case RoleName.Repairer:
        new Repairer(creep).DoWork();
        break;
      default:
        break;
    }
  })

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
