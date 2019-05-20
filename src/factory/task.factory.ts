import { TaskType } from "enums/task-type";
import { Action } from "enums/action";
import { Task, Target } from "types/task";
import { RoomUtilities } from "room";

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
            case TaskType.CollectHarvested:
                return this.GetCollectHarvested(creep);
            case TaskType.Upgrade:
                return this.GetUpgrade(creep);
            case TaskType.Repair:
                return this.GetRepair(creep);
            case TaskType.Nurse:
                return this.GetNurse(creep);
            case TaskType.Deliver:
                return this.GetDeliver(creep);
            case TaskType.ChargeTower:
                return this.GetChargeTower(creep);
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
        const creepsHarvesting = _.filter(Game.creeps, crp => crp.memory.task && crp.memory.task.sourceId && crp.name != creep.name);
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);

        const leastBusySource = sources.reduce((preSource, curSource) => {
            const preSourceUsers = creepsHarvesting.filter(creep => creep.memory.task!.sourceId === preSource.id).length;
            const curSourceUsers = creepsHarvesting.filter(creep => creep.memory.task!.sourceId === curSource.id).length;
            if (preSourceUsers === curSourceUsers) {
                return preSource.pos.getRangeTo(creep.pos) < curSource.pos.getRangeTo(creep.pos) ? preSource : curSource;
            }
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
        return this.GetUpgrade(creep);
    }

    private static GetCollect(creep: Creep) {
        const containers = creep.room.find<StructureStorage | StructureContainer>(FIND_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE);
        const targets = containers.filter(container => _.sum(container.store) > creep.carryCapacity);

        if (!targets.length) {
            console.log('no target, harvest');
            return this.GetHarvest(creep);
        }

        const target = creep.pos.findClosestByRange(targets);
        if (!target) {
            console.log('no target source container, harvest instead');
            return this.GetHarvest(creep);
        }

        return {
            targetAction: Action.Collect,
            targetId: target.id,
            complete: false
        } as Task;
    }

    private static GetCollectHarvested(creep: Creep) {
        const containerIds = creep.room.memory.sourceContainerIds;
        if (!containerIds || !containerIds.length) {
            console.log('no source containers, harvest instead');
            return this.GetHarvest(creep);
        }
        const containers = containerIds.map(id => Game.getObjectById(id) as StructureContainer | StructureStorage);
        const targets = containers.filter(container => _.sum(container.store) > creep.carryCapacity);

        if (!targets.length) {
            console.log('no target, harvest');
            return this.GetCollect(creep);
        }

        const target = creep.pos.findClosestByRange(targets);
        if (!target) {
            console.log('no target source container, harvest instead');
            return this.GetCollect(creep);
        }

        return {
            targetAction: Action.Collect,
            targetId: target.id,
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
        const damagedStructures = RoomUtilities.GetDamagedStructures(creep.room)
        let damaged = damagedStructures.length ? damagedStructures : RoomUtilities.GetDamagedDefenses(creep.room);
        console.log(`${damaged.length} damaged`)
        damaged.forEach(structure => structure.room.visual.circle(structure.pos,
            { fill: 'transparent', radius: 0.55, stroke: 'red' }))
        if (damaged.length) {
            const target = damaged.reduce((p, c) => {
                let previousHealthPerc = p.hits / p.hitsMax;
                let currentHealthPerc = c.hits / c.hitsMax;
                if (previousHealthPerc === currentHealthPerc) {
                    let closest = creep.pos.findClosestByPath([c, p])
                    if (!!closest) {
                        return closest;
                    }
                } if (previousHealthPerc < currentHealthPerc) {
                    return p;
                } else {
                    return c;
                }
                // return (p.hitsMax / p.hits) > (c.hits / c.hitsMax) ? p : c;
            });
            creep.say(`Repair o'clock`);
            return {
                targetAction: Action.Repair,
                targetId: target.id,
                complete: false
            } as Task;
        }
        creep.say(`Eat Me!`);
        return this.GetBuild(creep);
    }

    private static GetNurse(creep: Creep) {

        let targets: Array<StructureSpawn | StructureExtension> = creep.room.find(FIND_MY_SPAWNS);
        targets = targets.concat(creep.room.find<StructureSpawn | StructureExtension>(FIND_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_EXTENSION));

        if (!targets.length) {
            creep.say('no target structure, upgrade instead');
            return this.GetUpgrade(creep);
        }

        const targetsWithSpace = targets.filter(structure => structure.energy < structure.energyCapacity);

        const target = creep.pos.findClosestByRange(targetsWithSpace);
        if (!target) {
            creep.say('no target with available, upgrade instead');
            return this.GetUpgrade(creep);
        }

        return {
            targetAction: Action.Transfer,
            targetId: target.id,
            complete: false
        } as Task;
    }

    private static GetDeliver(creep: Creep) {
        const containers = creep.room.find<StructureStorage | StructureContainer>(FIND_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE);
        const targets = containers.filter(container => !creep.room.memory.sourceContainerIds.includes(container.id))
            .filter(container => container.storeCapacity - _.sum(container.store) > creep.carry.energy);

        const target = creep.pos.findClosestByRange(targets);
        if (!target) {
            creep.say('no target with available, upgrade instead');
            return this.GetUpgrade(creep);
        }

        return {
            targetAction: Action.Transfer,
            targetId: target.id,
            complete: false
        } as Task;
    }

    private static GetChargeTower(creep: Creep) {
        const towers = creep.room.find<StructureTower>(FIND_STRUCTURES)
            .filter(structure => structure.structureType === STRUCTURE_TOWER)
            .filter(structure => structure.energy < structure.energyCapacity);

        if (!towers.length) {
            return this.GetDeliver(creep);
        }

        const target = towers.reduce((p, c) => {
            return p.energy <= c.energy ? p : c;
        })

        return {
            targetAction: Action.Transfer,
            targetId: target.id,
            complete: false
        } as Task;
    }
}