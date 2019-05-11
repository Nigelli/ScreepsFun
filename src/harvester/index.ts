import { TaskFactory } from "factory/task.factory";
import { TaskProcessor } from "processor/task.processor";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";

export class Harvester implements BaseCreep {
    private creep: Creep;

    constructor(creep: Creep) {
        this.creep = creep;
    }

    // Do Work
    public DoWork(): void {
        if (!this.creep.memory.task || this.creep.memory.task.complete) {
            this.creep.memory.task = this.GetTask();
        }
        TaskProcessor.Process(this.creep.memory.task as Task, this.creep);
    }

    private GetTask(): Task | undefined {
        if (this.creep.carryCapacity === _.sum(this.creep.carry)) {
            return TaskFactory.Create(TaskType.Deposit, this.creep);
        } else {
            return TaskFactory.Create(TaskType.Harvest, this.creep);
        }
    }
}