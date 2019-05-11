import { ErrorMapper } from "utils/ErrorMapper";
<<<<<<< HEAD
import { RoomUtilities } from "room";
import { Harvester } from "harvester";
import { Spawns } from "enums/spawn";
import { Spawner } from "spawning/spawner";
=======
import { Spawner } from "behaviour/spawner/Spawner";
import { ROLES } from "config/roles/Constants";
import { GameLoop } from "decision/GameLoop";

>>>>>>> 64a9bbc54713b5781262ddec53a805d6e3f1ceec

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
<<<<<<< HEAD

  Spawner.createHarvester(Game.spawns[Spawns.Spawn1]);
  // if (!Object.keys(Memory.creeps).length) {
  //   Game.spawns[Spawns.Spawn1].createCreep([WORK, MOVE, CARRY], 'MyFirstCreep', { role: 'Harvester' });
  // }

  _.forEach(Game.rooms, (room) => {
    new RoomUtilities(room);
  })

  _.forEach(Game.creeps, (creep) => {
    if (creep.memory.role === 'Harvester') {
      const harvester = new Harvester(creep);
      harvester.DoWork();
    }
  })

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
=======
  

  GameLoop.Run();
  // _.forEach(Game.spawns, spawn => Spawner.spawnCreep(ROLES.HARVESTER, spawn.name));

  
>>>>>>> 64a9bbc54713b5781262ddec53a805d6e3f1ceec
});
