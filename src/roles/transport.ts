import { TaskFactory } from "factory/task.factory";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { BaseCreep } from "./base-creep";
import { Action } from "enums/action";
import { TaskProcessor } from "processor/task.processor";

export class Transporter extends BaseCreep {

    public static DoWork(creep: Creep) {
        if (Game.time % 6 === 0 && creep.memory.task && creep.memory.task.targetAction === Action.Harvest) {
            creep.memory.task = this.GetTask(creep) as Task;
            TaskProcessor.Process(creep.memory.task, creep)
        } else {
            super.DoWork(creep)
        }
    }

    public static GetTask(creep: Creep): Task | undefined {
        if (_.sum(creep.carry) <= creep.carryCapacity / 2) {
            return TaskFactory.Create(TaskType.CollectHarvested, creep);
        } else {
            return TaskFactory.Create(TaskType.ChargeTower, creep);
        }
    }
}