import { TaskFactory } from "factory/task.factory";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { BaseCreep } from "./base-creep";

export class Upgrader extends BaseCreep implements RoleCreep {

    constructor(creep: Creep) {
        super(creep);
    }

    protected GetTask(): Task | undefined {
        if (_.sum(this.creep.carry) < this.creep.carryCapacity) {
            return TaskFactory.Create(TaskType.Collect, this.creep);
        } else {
            return TaskFactory.Create(TaskType.Upgrade, this.creep);
        }
    }
}