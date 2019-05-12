import { TaskType } from "enums/task-type";
import { Action } from "enums/action";
import { Task, Target } from "types/task";

export class TaskFactory {
    public static Create(taskType: TaskType, creep: Creep) {
        switch (taskType) {
            case TaskType.Deposit:
                return this.GetDeposit(creep);
            case TaskType.Harvest:
                return this.GetHarvest(creep);
            case TaskType.Build:
                return this.GetBuild(creep);
            case TaskType.Collect:
                return this.GetCollect(creep);
            case TaskType.Upgrade:
                return this.GetUpgrade(creep);
            case TaskType.Repair:
                return this.GetRepair(creep);
            default:
                throw new Error('Task Type Not Implemented');
        }
    }

    public static GetTarget(task: Task) {
        switch (task.targetAction) {
            case Action.Harvest:
                return Game.getObjectById(task.sourceId) as Source;
            case Action.Transfer:
                return Game.getObjectById(task.targetId) as Target;
            case Action.Build:
                return Game.getObjectById(task.targetId) as Target;
            case Action.Repair:
                return Game.getObjectById(task.targetId) as Target;
            default:
                return Game.getObjectById(task.targetId) as Target;
        }
    }

    private static GetDeposit(creep: Creep) {
        return {
            targetAction: Action.Transfer,
            targetId: (creep.room.controller as StructureController).id,
            complete: false
        } as Task;
    }

    private static GetHarvest(creep: Creep) {
        return {
            targetAction: Action.Harvest,
            sourceId: creep.room.find(FIND_SOURCES_ACTIVE)[0].id,
            complete: false
        } as Task;
    }

    private static GetBuild(creep: Creep) {
        const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        if (sites.length) {
            return {
                targetAction: Action.Build,
                targetId: sites[0].id,
                complete: false
            } as Task;
        }
        return creep.memory.task;
    }

    private static GetCollect(creep: Creep) {
        return {
            targetAction: Action.Collect,
            sourceId: creep.room.memory.sourceContainerIds[0],
            complete: false
        } as Task;
    }

    private static GetUpgrade(creep: Creep) {
        return {
            targetAction: Action.Transfer,
            targetId: (creep.room.controller as StructureController).id,
            complete: false
        } as Task;
    }

    private static GetRepair(creep: Creep) {
        console.log(creep.room.find(FIND_STRUCTURES))
        let damaged = creep.room.find(FIND_STRUCTURES).filter(structure => structure.hits < structure.hitsMax);
        if (damaged.length) {
            const target = damaged.reduce((p, c) => {
                return (p.hitsMax / p.hits) > (c.hits / c.hitsMax) ? p : c;
            })
            return {
                targetAction: Action.Repair,
                targetId: target.id,
                complete: false
            } as Task;
        }
        return {
            targetAction: Action.Repair,
            targetId: '',
            complete: true
        }
    }
}