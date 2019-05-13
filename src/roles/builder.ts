import { TaskFactory } from "factory/task.factory";
import { TaskProcessor } from "processor/task.processor";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { Action } from "enums/action";
import { BaseCreep } from "./base-creep";

export class Builder extends BaseCreep implements RoleCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    protected GetTask(): Task | undefined {
        if (_.sum(this.creep.carry) >= this.creep.carryCapacity / 2) {
            return TaskFactory.Create(TaskType.Build, this.creep);
        } else {
            return TaskFactory.Create(TaskType.Collect, this.creep);
        }
    }
}