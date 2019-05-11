import { ErrorMapper } from "utils/ErrorMapper";
import { RoomUtilities } from "room";
import { Harvester } from "harvester";
import { Spawns } from "enums/spawn";
import { Spawner } from "spawning/spawner";

 When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
 This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
console.log(`Current game tick is ${Game.time}`);

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
});
