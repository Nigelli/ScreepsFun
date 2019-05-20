import { Task } from "types/task";
import { TaskProcessor } from "processor/task.processor";

export class BaseCreep {

    public static DoWork(creep: Creep): void {
        if (!creep.memory.task || creep.memory.task.complete) {
            creep.memory.task = this.GetTask(creep);
        }
        TaskProcessor.Process(creep.memory.task as Task, creep);
    }

    public static GetTask(creep: Creep): Task | undefined {
        creep.say(`Looks like my role has no GetTask implementation`);
        return;
    }

}