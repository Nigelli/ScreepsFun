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
            case Action.Collect:
                return Game.getObjectById(task.targetId) as Target;
            case Action.Upgrade:
                return Game.getObjectById(task.targetId) as Target;
            default:
                throw new Error('Action Type Not Implemented');
        }
    }

    private static GetDeposit(creep: Creep) {
        const containerIds = creep.room.memory.sourceContainerIds;
        if (!containerIds || !containerIds.length) {
            console.log('no source containers, upgrade instead');
            return this.GetUpgrade(creep);
        }
        const containers = containerIds.map(id => Game.getObjectById(id) as StructureContainer | StructureStorage);
        const targets = containers.filter(container => (container.storeCapacity - _.sum(container.store)) > creep.carryCapacity);

        if (!targets.length) {
            console.log('no space in source containers, upgrade instead');
            return this.GetUpgrade(creep);
        }

        const target = creep.pos.findClosestByRange(targets);
        if (!target) {
            console.log('no target source container, upgrade instead');
            return this.GetUpgrade(creep);
        }

        return {
            targetAction: Action.Transfer,
            targetId: target.id,
            complete: false
        } as Task;
    }

    private static GetHarvest(creep: Creep) {
        const creepsHarvesting = _.filter(Game.creeps, creep => creep.memory.task && creep.memory.task.sourceId);
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        const leastBusySource = sources.reduce((preSource, curSource) => {
            const preSourceUsers = creepsHarvesting.filter(creep => creep.memory.task!.sourceId === preSource.id).length;
            const curSourceUsers = creepsHarvesting.filter(creep => creep.memory.task!.sourceId === curSource.id).length;
            return preSourceUsers <= curSourceUsers ? preSource : curSource;
        })

        return {
            targetAction: Action.Harvest,
            sourceId: leastBusySource.id,
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
        const containerIds = creep.room.memory.sourceContainerIds;
        if (!containerIds || !containerIds.length) {
            return this.GetHarvest(creep);
        }
        const containers = containerIds.map(id => Game.getObjectById(id) as StructureContainer | StructureStorage);
        const target = containers.filter(container => _.sum(container.store) > creep.carryCapacity);

        if (!target.length) {
            console.log('no target, harvest');
            return this.GetHarvest(creep);
        }

        return {
            targetAction: Action.Collect,
            targetId: target[0].id,
            complete: false
        } as Task;
    }

    private static GetUpgrade(creep: Creep) {
        return {
            targetAction: Action.Upgrade,
            targetId: (creep.room.controller as StructureController).id,
            complete: false
        } as Task;
    }

    private static GetRepair(creep: Creep) {
        let damaged = creep.room.find(FIND_STRUCTURES).filter(structure => structure.hits < structure.hitsMax);
        if (damaged.length) {
            const target = damaged.reduce((p, c) => {
                return (p.hitsMax / p.hits) > (c.hits / c.hitsMax) ? p : c;
            });
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