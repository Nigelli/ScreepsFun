export class Mapping {
    public static getClosestNoneEmptyContainer(creep: Creep) {
        var storeTargets = _.filter(Memory.Structures, (structure: AnyStructure) => {
               return (((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
               && structure.store[RESOURCE_ENERGY] < structure.storeCapacity))
            }); 
        if (storeTargets.length) {
            return this.getClosestTarget(storeTargets, creep);
        }
        return false;
    }


    public static getClosestTarget (targets: AnyStructure[], creep: Creep) {
        return creep.pos.findClosestByPath(targets);
    }
}