export class MemoryManagement {
    public static clearDeadCreeps(): void {
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                console.log(`Removing Creep :: ${name} from memory`)
                delete Memory.creeps[name];
            }
        }
    }
}