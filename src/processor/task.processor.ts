import { Action } from "enums/action";
import { Task, Target } from "types/task";
import { TaskFactory } from "factory/task.factory";

export class TaskProcessor {
    public static Process(task: Task, creep: Creep) {
        const target = TaskFactory.GetTarget(task);
        if (this.IsCloseEnough(task.targetAction, target, creep.pos)) {
            this.DoAction(task, target, creep);
        } else {
            creep.moveTo(target);
        }
    }

    private static IsCloseEnough(action: Action, target: _HasRoomPosition, creepPosition: RoomPosition): boolean {
        switch (action) {
            default:
                return creepPosition.isNearTo(target);
        }
    }

    private static DoAction(task: Task, target: Target, creep: Creep) {
        switch (task.targetAction) {
            case Action.Harvest:
                this.ProcessHarvest(task, creep);
                break;
            case Action.Transfer:
                this.ProcessTransfer(target, creep, task);
                break;
            case Action.Build:
                this.ProcessBuild(target, creep, task);
                break;
            case Action.Repair:
                this.ProcessRepair(target, creep, task);
                break;
            default:
                throw new Error('Action has no implmented processor');
        }
    }

    private static ProcessHarvest(task: Task, creep: Creep) {
        if (creep.carryCapacity === _.sum(creep.carry)) {
            task.complete = true;
            return;
        }
        const source = Game.getObjectById<Source | Mineral>(task.sourceId);
        if (!source) {
            throw new Error(`${creep.name} has a harvest task with no source`);
        }
        creep.harvest(source);
    }

    private static ProcessTransfer(target: Target, creep: Creep, task: Task) {
        if (!target) {
            throw new Error(`${creep.name} has a transfer task with no target`);
        }
        if (0 === _.sum(creep.carry)) {
            task.complete = true;
            return;
        }
        if ((target as Structure).structureType &&
            (target as Structure).structureType === STRUCTURE_CONTROLLER) {
            creep.upgradeController(target as StructureController);
        } else {
            creep.transfer(target as Creep, RESOURCE_ENERGY);
        }
    }

    private static ProcessBuild(target: Target, creep: Creep, task: Task) {
        if (!(target instanceof ConstructionSite)) {
            task.complete = true;
            return;
        }

        if (creep.build(target) !== OK) {
            task.complete = true;
        }
    }

    private static ProcessRepair(target: Target, creep: Creep, task: Task) {
        if (!(target instanceof Structure)) {
            task.complete = true;
            return;
        }

        if (creep.repair(target) !== OK) {
            task.complete = true;
        }
    }
}