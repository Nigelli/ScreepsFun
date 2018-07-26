import { ErrorMapper } from "utils/ErrorMapper";
import { MemoryManagement } from "memory/Memory";
import { Spawner } from "behaviour/spawner/Spawner";
import { ROLES } from "config/roles/Constants";
import { GameLoop } from "decsion/GameLoop";


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  
  MemoryManagement.clearDeadCreeps();

  new GameLoop().Run();
  // _.forEach(Game.spawns, spawn => Spawner.spawnCreep(ROLES.HARVESTER, spawn.name));

  
});
