import { ErrorMapper } from "utils/ErrorMapper";
import { RoomUtilities } from "room";
import { Harvester } from "roles/harvester";
import { Spawner } from "spawning/spawner";
import { RoleName } from "enums/role-name";
import { Builder } from "roles/builder";
import { Repairer } from "roles/repairer";
import { Upgrader } from "roles/upgrader";
import { Nurse } from "roles/nurse";
import { Transporter } from "roles/transport";
import { Towers } from "towers";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  _.forEach(Game.spawns, spawn => Spawner.createCreeps(spawn));

  _.forEach(Game.rooms, (room) => {
    Towers.Loop(room);
    RoomUtilities.Loop(room);
  })

  _.forEach(Game.creeps, (creep) => {
    switch (creep.memory.role) {
      case RoleName.Builder:
        Builder.DoWork(creep);
        break;
      case RoleName.Harvester:
        Harvester.DoWork(creep);
        break;
      case RoleName.Repairer:
        Repairer.DoWork(creep);
        break;
      case RoleName.Upgrader:
        Upgrader.DoWork(creep);
        break;
      case RoleName.Nurse:
        Nurse.DoWork(creep);
        break;
      case RoleName.Transporter:
        Transporter.DoWork(creep);
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
