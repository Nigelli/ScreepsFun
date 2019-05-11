import { Action } from "enums/action";
import { Task, Target } from "types/task";

export class TaskProcessor {
    public static Process(task: Task, creep: Creep) {
        const target = this.GetCurrentTarget(task);
        if (this.IsCloseEnough(task.targetAction, target, creep.pos)) {
            this.DoAction(task, target, creep);
        } else {
            creep.moveTo(target);
        }
    }

    private static GetCurrentTarget(task: Task) {
        switch (task.targetAction) {
            case Action.Harvest:
                return Game.getObjectById(task.sourceId) as Source;
            case Action.Transfer:
                return Game.getObjectById(task.targetId) as Target;
            default:
                throw new Error('No method implemented for this Action Type');
        }
    }

    private static IsCloseEnough(action: Action, target: _HasRoomPosition, creepPosition: RoomPosition): boolean {
        switch (action) {
            case Action.Transfer:
                return creepPosition.inRangeTo(target.pos, 1);
            case Action.Harvest:
                return creepPosition.isNearTo(target);
            default:
                throw new Error('No method implemented for this Action Type');
        }
    }

    private static DoAction(task: Task, target: Target, creep: Creep) {
        switch (task.targetAction) {
            case Action.Harvest:
                if (creep.carryCapacity === _.sum(creep.carry)) {
                    task.complete = true;
                    return;
                }
                const source = Game.getObjectById<Source | Mineral>(task.sourceId);
                if (!source) {
                    throw new Error(`${creep.name} has a harvest task with no source`);
                }
                creep.harvest(source);
                break;
            case Action.Transfer:
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
                break
            default:
                throw new Error('Action has no implmented processor');
        }
    }
}