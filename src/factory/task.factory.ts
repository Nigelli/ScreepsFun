import { TaskType } from "enums/task-type";
import { Action } from "enums/action";
import { Task } from "types/task";

export class TaskFactory {
    public static Create(taskType: TaskType, creep: Creep) {
        switch (taskType) {
            case TaskType.Deposit:
                return {
                    targetAction: Action.Transfer,
                    targetId: (creep.room.controller as StructureController).id,
                    complete: false
                } as Task;
            case TaskType.Harvest:
                return {
                    targetAction: Action.Harvest,
                    sourceId: creep.room.memory.sources[0].id,
                    complete: false
                } as Task;
            default:
                throw new Error('Task Type Not Implemented');
        }
    }
}