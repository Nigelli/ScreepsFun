import { TaskFactory } from "factory/task.factory";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { BaseCreep } from "./base-creep";

export class Harvester extends BaseCreep {

    public static DoWork(creep: Creep) {
        super.DoWork(creep)
    }

    public static GetTask(creep: Creep): Task | undefined {
        if (creep.carryCapacity === _.sum(creep.carry)) {
            return TaskFactory.Create(TaskType.Deposit, creep);
        } else {
            return TaskFactory.Create(TaskType.Harvest, creep);
        }
    }
}