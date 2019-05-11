import { TaskFactory } from "factory/task.factory";
import { TaskProcessor } from "processor/task.processor";
import { Task } from "types/task";
import { TaskType } from "enums/task-type";
import { Action } from "enums/action";

export class Builder implements BaseCreep {
    private creep: Creep;

    constructor(creep: Creep) {
        this.creep = creep;
    }

    // Do Work
    public DoWork(): void {
        if (!this.creep.memory.task || this.creep.memory.task.complete) {
            const newTask = this.GetTask();
            if (!newTask || newTask.complete) {
                return;
            }
            this.creep.memory.task = newTask;
        }

        if (this.creep.memory.task.targetId) {
            const target = Game.getObjectById(this.creep.memory.task.targetId) as ConstructionSite;
            const buildResult = this.creep.build(target);
            console.log(buildResult);
            switch (buildResult) {
                case ERR_NOT_IN_RANGE:
                    this.creep.moveTo(target);
                    break;

                case ERR_NOT_ENOUGH_ENERGY:
                    this.creep.memory.task = this.GetTask();
                    break;
                default:
                    break;
            }
        } else if (this.creep.memory.task.sourceId) {
            TaskProcessor.Process(this.creep.memory.task, this.creep);
        }


    }

    private GetTask(): Task | undefined {
        if (_.sum(this.creep.carry) >= this.creep.carryCapacity / 2) {
            return TaskFactory.Create(TaskType.Build, this.creep);
        } else {
            return TaskFactory.Create(TaskType.Harvest, this.creep);
        }
    }
}