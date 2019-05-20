export class Towers {
    public static Loop(room: Room) {
        room.find(FIND_STRUCTURES).filter(structure => structure.structureType === STRUCTURE_TOWER)
            .forEach(tower => (tower as StructureTower).attack(this.GetTarget((tower as StructureTower)) as Creep));
    }

    private static GetTarget(tower: StructureTower): Creep | null {
        const hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        if (!hostiles.length) {
            return null;
        }
        if (hostiles.length === 1) {
            return hostiles[0];
        }
        return tower.pos.findClosestByRange(hostiles);
    }
}