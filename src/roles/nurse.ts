import { TaskFactory } from "factory/task.factory";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { BaseCreep } from "./base-creep";

export class Nurse extends BaseCreep {

    public static DoWork(creep: Creep) {
        super.DoWork(creep)
    }

    public static GetTask(creep: Creep): Task | undefined {
        if (_.sum(creep.carry) < creep.carryCapacity / 2) {
            return TaskFactory.Create(TaskType.Collect, creep);
        } else {
            return TaskFactory.Create(TaskType.Nurse, creep);
        }
    }
}