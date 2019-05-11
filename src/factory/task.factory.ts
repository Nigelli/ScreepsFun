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
                    sourceId: creep.room.find(FIND_SOURCES_ACTIVE)[0].id,
                    complete: false
                } as Task;
            case TaskType.Build:
                const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                if (sites.length) {
                    return {
                        targetAction: Action.Build,
                        targetId: sites[0].id,
                        complete: false
                    } as Task;
                }
                return creep.memory.task;
            default:
                throw new Error('Task Type Not Implemented');
        }
    }
}