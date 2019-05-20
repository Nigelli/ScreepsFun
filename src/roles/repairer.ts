import { TaskFactory } from "factory/task.factory";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { BaseCreep } from "./base-creep";
import { Action } from "enums/action";

export class Repairer extends BaseCreep {

    public static DoWork(creep: Creep) {
        if (creep.memory.task && creep.memory.task.targetAction === Action.Repair) {
            const structure = (Game.getObjectById(creep.memory.task.targetId) as Structure)
            if (structure.hits === structure.hitsMax) {
                creep.memory.task = this.GetTask(creep);
            }
        }
        super.DoWork(creep)
    }

    public static GetTask(creep: Creep): Task | undefined {
        if (_.sum(creep.carry) >= creep.carryCapacity / 2) {
            return TaskFactory.Create(TaskType.Repair, creep);
        } else {
            return TaskFactory.Create(TaskType.Collect, creep);
        }
    }
}