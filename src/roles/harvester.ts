import { TaskFactory } from "factory/task.factory";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { BaseCreep } from "./base-creep";

export class Harvester extends BaseCreep implements RoleCreep {
    constructor(creep: Creep) {
        super(creep);
    }

    protected GetTask(): Task | undefined {
        if (this.creep.carryCapacity === _.sum(this.creep.carry)) {
            return TaskFactory.Create(TaskType.Deposit, this.creep);
        } else {
            return TaskFactory.Create(TaskType.Harvest, this.creep);
        }
    }
}