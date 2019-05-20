import { TaskFactory } from "factory/task.factory";
import { TaskProcessor } from "processor/task.processor";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { Action } from "enums/action";
import { BaseCreep } from "./base-creep";

export class Builder extends BaseCreep {

    public static DoWork(creep: Creep) {
        super.DoWork(creep)
    }

    public static GetTask(creep: Creep): Task | undefined {
        if (_.sum(creep.carry) >= creep.carryCapacity / 2) {
            return TaskFactory.Create(TaskType.Build, creep);
        } else {
            return TaskFactory.Create(TaskType.Collect, creep);
        }
    }
}