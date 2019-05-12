import { Task } from "types/task";
import { TaskProcessor } from "processor/task.processor";

export class BaseCreep {
    protected creep: Creep;

    constructor(creep: Creep) {
        this.creep = creep;
    }

    public DoWork(): void {
        if (!this.creep.memory.task || this.creep.memory.task.complete) {
            this.creep.memory.task = this.GetTask();
        }
        TaskProcessor.Process(this.creep.memory.task as Task, this.creep);
    }

    protected GetTask(): Task | undefined {
        this.creep.say(`Looks like my role has no GetTask implementation`);
        return;
    }

}