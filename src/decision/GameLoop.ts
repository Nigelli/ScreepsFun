import { MemoryManagement } from "../memory/Memory";

export class GameLoop {

    public static Run(): void {
        this.Pre();
        this.Main();
        this.Post();
    }

    public static Pre() {
        console.log('Pre Loop');
        MemoryManagement.clearDeadCreeps();
        MemoryManagement.initialise();
    }

    public static Main() {
        console.log('Main Loop');
    }

    public static Post() {
        console.log('Post Loop');
    }
}